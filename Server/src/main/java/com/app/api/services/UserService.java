package com.app.api.services;


import com.app.api.entities.user.*;
import com.app.api.exceptions.UserException;
import com.app.api.repositories.ConfirmationRepository;
import com.app.api.repositories.ResetPassVerificationRep;
import com.app.api.repositories.TokenRepository;
import com.app.api.repositories.UserRepository;
import com.app.api.requests.AuthenticationRequest;
import com.app.api.requests.ChangePassRequest;
import com.app.api.requests.RegisterRequest;
import com.app.api.requests.UserProfileRequest;
import com.app.api.responses.AuthenticationResponse;
import com.app.api.responses.UserResponse;
import com.app.api.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;


@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    JwtService jwtService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    TokenRepository tokenRepository;
    @Autowired
    ConfirmationRepository confirmationRepository;
    @Autowired
    EmailService emailService;
    @Autowired
    ResetPassVerificationRep resetPassVerificationRep;
    public static final String USERS_PHOTO_DIRECTORY = "src/uploads/users/";
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        if(request.getUsername().trim().isEmpty() || request.getPassword().trim().isEmpty())
        {
            throw new UserException("Missing required field");
        }
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            // Authentication failed
            throw new UserException("Incorrect username or password");
        }
        var user = userRepository.findByUsername(request.getUsername());
        if(!user.isEnable()){
            throw new UserException("Account Not Verified: Please verify your email address by clicking on the confirmation link.");

        }

        var jwtToken = jwtService.generateToken(user);
//        var refreshToken = jwtService.generateRefreshToken(user);

        // revoke tokens for this user
        revokeAllUserTokens(user);
        // save the new user
        saveUserToken(user, jwtToken);

        return AuthenticationResponse
                .builder().accessToken(jwtToken)
//                .refreshToken(refreshToken)
                .build();

    }


    private void revokeAllUserTokens(UserEntity user) {
        var validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validUserTokens.isEmpty()) {
        }
        validUserTokens.forEach(t -> {
            t.setRevoked(true);
            t.setExpired(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    private void saveUserToken(UserEntity user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expired(false)
                .build();
        tokenRepository.save(token);
    }


    public UserEntity register(RegisterRequest request) {
        if(request.getFirstName().trim().isEmpty() || request.getLastName().trim().isEmpty() || request.getUsername().trim().isEmpty() || request.getPassword().trim().isEmpty())
        {
            throw new UserException("Missing required field");
        }
        var checkUser=userRepository.findByUsername(request.getUsername());
        if(checkUser!=null)
        {
            throw new UserException("Email already in use. Please use a different email and try again.");
        }
        var user = UserEntity.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .username(request.getUsername())
                .password(bCryptPasswordEncoder.encode(request.getPassword()))
                .build();
        user.setEnable(false);
        user.setCreatedDate(LocalDateTime.now());
        userRepository.save(user);
        Confirmation confirmation = new Confirmation(user);
        confirmationRepository.save(confirmation);
        //send confirmation email to user
        emailService.sendMail(user.getFirstName(),user.getUsername(),confirmation.getConfirmationKey());

        return user;
    }
    public UserResponse geProfileData(String userName)
    {
        UserEntity user = userRepository.findByUsername(userName);
        UserResponse userResponse = new UserResponse();
        BeanUtils.copyProperties(user, userResponse);
        return userResponse;
    }
    public Boolean verifyConfirmationKey(String key){
        Confirmation confirmation = confirmationRepository.findByConfirmationKey(key);

        // Check if the confirmation is null or the key has already been used
        if (confirmation == null || confirmation.isKeyUsed()) {
            return Boolean.FALSE;
        }

        UserEntity user = userRepository.findByUsername(confirmation.getUser().getUsername());
        user.setEnable(true);
        userRepository.save(user);

        // Mark the key as used
        confirmation.setKeyUsed(true);
        confirmationRepository.save(confirmation);

        return Boolean.TRUE;
    }


    public void changePassword(ChangePassRequest request, Principal connectedUser) {
        //cast the object connectduser to userEntity
        var user = (UserEntity) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
        //check if the current password is correct
        if (!bCryptPasswordEncoder.matches(request.getCurrentPass(), user.getPassword())) {
            throw new IllegalStateException("wrong password");
        }
        //check if the new password is correct
        if (!request.getNewPass().equals(request.getConfirmPass())) {
            throw new IllegalStateException("password are not the same");
        }
        user.setPassword(bCryptPasswordEncoder.encode(request.getNewPass()));
        user.setResetPasswordToken(null);
        userRepository.save(user);
    }
    public String sendResetPasswordEmail(String username)
    {
        var user  = userRepository.findByUsername(username);
        if(user == null)
        {
            throw new UserException("there is no account with this email address");
        }
        // Generate reset password verification token with expiration time
        LocalDateTime expirationTime = LocalDateTime.now().plus(10, ChronoUnit.MINUTES);
        ResetPasswordVerification verification = new ResetPasswordVerification(user, expirationTime);
        emailService.sendResetPassMail(user.getFirstName(),user.getUsername(),verification.getResetPasswordKey());
        resetPassVerificationRep.save(verification);
        return "we sent you an email to reset your password";
    }

    public String resetPassword(ChangePassRequest request, String token)
    {
        ResetPasswordVerification verification = resetPassVerificationRep.findByResetPasswordKey(token);
        var user = verification.getUser();
        if (!request.getNewPass().equals(request.getConfirmPass())) {
            throw new IllegalStateException("password are not the same");
        }
        user.setPassword(bCryptPasswordEncoder.encode(request.getNewPass()));
        verification.setKeyUsed(true);
        resetPassVerificationRep.save(verification);
        userRepository.save(user);
        return "Password reset successfully";

    }



//    public void updateResetPasswordToken(String token, String username) {
//        UserEntity userEntity = userRepository.findByUsername(username);
//        if (userEntity != null) {
//            userEntity.setResetPasswordToken(token);
//            userRepository.save(userEntity);
//        }
//
//    }
//
//    public UserEntity getByResetPasswordToken(String token) {
//        return userRepository.findByResetPasswordToken(token);
//    }

    public UserResponse updateProfileData(UserProfileRequest request) {
        var user = userRepository.findByUserId(request.getUserId());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setBirthDate(request.getBirthDate());
        user.setPhone(request.getPhone());
        userRepository.save(user);
        UserResponse userResponse = new UserResponse();
        BeanUtils.copyProperties(user, userResponse);
        return userResponse;
    }

    public String uploadUserPhoto(String userId, MultipartFile file) {
        var user = userRepository.findByUserId(userId);
        String photoUrl = photoFunction.apply(userId, file);
        user.setPhotoUrl(photoUrl);
        userRepository.save(user);
        return photoUrl;
    }

    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    private final BiFunction<String, MultipartFile, String> photoFunction = (userId, image) -> {
        String filename = userId + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(USERS_PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if(!Files.exists(fileStorageLocation)) { Files.createDirectories(fileStorageLocation); }
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/api/v1/users/image/" + filename).toUriString();
        }catch (Exception exception) {
            throw new RuntimeException("Unable to save image");
        }
    };

//    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        final String authHeader = request.getHeader("Authorization");
//        final String refreshToken;
//        final String username;
//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            return;
//        }
//        refreshToken = authHeader.substring(7);
//        username = jwtService.extractUsername(refreshToken);
//        if (username != null) {
//            var userDetails = this.userRepository.findByUsername(username);
//            if (jwtService.isTokenValid(refreshToken, userDetails)) {
//                var accessToken = jwtService.generateToken(userDetails);
//                revokeAllUserTokens(userDetails);
//                saveUserToken(userDetails,accessToken);
//                var authResponse = AuthenticationResponse.builder()
//                        .accessToken(accessToken)
//                        .refreshToken(refreshToken)
//                        .build();
//                new ObjectMapper().writeValue(response.getOutputStream(),authResponse);
//            }
//        }
//    }
//





}

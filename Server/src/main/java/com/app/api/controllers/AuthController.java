package com.app.api.controllers;

import com.app.api.requests.AuthenticationRequest;
import com.app.api.requests.ChangePassRequest;
import com.app.api.requests.RegisterRequest;
import com.app.api.responses.AuthenticationResponse;
import com.app.api.responses.UserResponse;
import com.app.api.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.net.URI;



@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    @Autowired
    UserService userService;
    private boolean isTokenUsed = false;
    @GetMapping
    public ResponseEntity<String> confirmUserAccount(@RequestParam("token") String token) {
        if (!isTokenUsed) {
            Boolean isSuccess = userService.verifyConfirmationKey(token);
            if (isSuccess) {
                isTokenUsed = true;
                return ResponseEntity.ok("Account verified successfully");
            } else {
                return ResponseEntity.badRequest().body("Invalid token");
            }
        } else {
            return ResponseEntity.badRequest().body("This account has already been verified");
        }
    }


    @PostMapping("/register")

    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest request) {
        var user = userService.register(request);
        return ResponseEntity.created(URI.create("")).body(
                UserResponse.builder()
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .username(user.getUsername())
                        .build()
        );

    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(userService.authenticate(request));
    }

    @PostMapping("/reset-password")
    public String sendResetPasswordEmail(@RequestParam String username) {
        return userService.sendResetPasswordEmail(username);
    }
    @PostMapping("/reset-password-process")
    public String resetPassword(@RequestBody ChangePassRequest request, @RequestParam("token") String token) {
        return userService.resetPassword(request,token);
    }

//    @PostMapping("/refresh-token")
//    public void refreshToken(
//            HttpServletRequest request,
//            HttpServletResponse response
//    ) throws IOException {
//        userService.refreshToken(request, response);
//    }




}

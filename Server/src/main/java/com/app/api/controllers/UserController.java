package com.app.api.controllers;

import com.app.api.requests.ChangePassRequest;
import com.app.api.requests.UserProfileRequest;
import com.app.api.responses.UserResponse;
import com.app.api.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.Principal;

import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

@RestController
@RequestMapping("api/v1/users")
public class UserController {

    @Autowired
    UserService userService;
    public static final String USERS_PHOTO_DIRECTORY = "src/uploads/users/";
    @GetMapping("/profile")
    public UserResponse getProfileData() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        return userService.geProfileData(username);
    }
    @PatchMapping("/update-profile")
    public UserResponse updateProfileData(@ModelAttribute UserProfileRequest request)
    {
        return userService.updateProfileData(request);
    }
    @GetMapping(path = "/image/{filename}", produces = { IMAGE_PNG_VALUE, IMAGE_JPEG_VALUE })
    public byte[] getUserPhoto(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(USERS_PHOTO_DIRECTORY + filename));
    }


    @PatchMapping
    public ResponseEntity<?> changePassword(@RequestBody ChangePassRequest request,
                                            Principal connectedUser) {
        userService.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/upload-photo")
    public ResponseEntity<String> uploadUserPhoto(@RequestParam("userId") String userId, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(userService.uploadUserPhoto(userId, file));
    }




}

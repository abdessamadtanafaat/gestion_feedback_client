package com.app.api.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileRequest {
    private String userId;
    private String username;
    private String firstName;
    private String lastName;
    private String phone;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date birthDate;
}

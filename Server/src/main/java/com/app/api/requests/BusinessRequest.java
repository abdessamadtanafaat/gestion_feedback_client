package com.app.api.requests;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BusinessRequest {
    private String businessName;
    private String email;
    private String phone;
    private String address;
    private String facebookLink;
    private String instagramLink;
    private String googleLink;
    private MultipartFile file;

}

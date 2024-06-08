package com.app.api.responses;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BusinessResponse {
    private String businessId;
    private String businessName;
    private String typeName;
    private String categoryName;
    private String coverImageUrl;
    private String email;
    private String phone;
    private String address;
    private String facebookLink;
    private String instagramLink;
    private String googleLink;

}

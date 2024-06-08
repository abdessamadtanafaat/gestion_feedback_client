package com.app.api.requests;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoyaltyProgrammeRequest {
    private Long id;
    private String mysteryBoxPrize;
    private String prizeImageUrl;
    private Integer prizeQuantity;
    private Integer npsValue;
    private Integer minAge;
    private Integer maxAge;
    private String genders;
    private Integer prizeFrequency;
    private String couponCode;
    private boolean couponCodeStatus;
    private double couponValue;



}

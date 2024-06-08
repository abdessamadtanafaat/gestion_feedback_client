package com.app.api.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CouponCodeConfigResponse {
    private Long id;
    private String couponCode;
    private boolean couponCodeStatus;
    private double couponValue;
    private Integer minAge;
    private Integer maxAge;
    private String gender;


}

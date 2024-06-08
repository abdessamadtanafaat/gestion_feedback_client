package com.app.api.responses;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DisplayResponse {
    private Long id;
    private String qrCode;
    private int numberOfScans;
    private String businessName;

}

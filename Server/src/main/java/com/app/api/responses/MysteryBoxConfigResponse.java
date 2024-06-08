package com.app.api.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MysteryBoxConfigResponse {
    private Long id;
    private String mysteryBoxPrize;
    private String prizeImageUrl;
    private Integer prizeQuantity;
    private Integer prizeFrequency;
    private Integer minAge;
    private Integer maxAge;
    private String gender;

}

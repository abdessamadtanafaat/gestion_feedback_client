package com.app.api.responses;

import com.app.api.entities.Campaign.PrizeCondition;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoyaltyProgrammeResponse {

    private Long id;
    private String mysteryBoxPrize;
    private PrizeCondition PrizeCondition;


}

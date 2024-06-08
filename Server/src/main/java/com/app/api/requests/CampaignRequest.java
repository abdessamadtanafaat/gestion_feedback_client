package com.app.api.requests;

import com.app.api.entities.Campaign.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CampaignRequest {
    private String businessId;
    private List<LoyaltyProgrammeRequest> loyaltyProgrammes;
    private long template_id;
    private List<ServiceArea> serviceAreas;
    private List<Language> languages;


}

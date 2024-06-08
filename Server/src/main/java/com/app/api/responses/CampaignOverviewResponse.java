package com.app.api.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CampaignOverviewResponse {
    private String campaignId;
    private String businessName;
    private String backgroundImageUrl;
    private int numberOfScans;
    private int numberOfAnswers;
    private int averageNPS;
    private int csat;
}

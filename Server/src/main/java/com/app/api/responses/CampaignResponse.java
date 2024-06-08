package com.app.api.responses;

import com.app.api.entities.Campaign.Language;

import com.app.api.entities.Campaign.Template;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CampaignResponse {
    private BusinessResponse business;
    private Template template;
    private List<ServiceAreaResponse> serviceAreas;
    private List<Language> languages;
    private List<String> loyaltyProgrammeTypes;
}

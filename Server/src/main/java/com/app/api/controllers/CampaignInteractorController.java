package com.app.api.controllers;

import com.app.api.entities.Campaign.Answer;
import com.app.api.entities.Campaign.Customer;
import com.app.api.responses.CampaignResponse;
import com.app.api.responses.WinnerResponse;
import com.app.api.services.AnswerService;
import com.app.api.services.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/campaignInteractor")
public class CampaignInteractorController {
    @Autowired
    AnswerService answerService;
    @Autowired
    CampaignService campaignService;
    @PostMapping("/save-answer/{campaignId}")
    public Long saveAnswer(@RequestBody Answer answer, @PathVariable String campaignId)
    {
        return answerService.saveAnswer(answer,campaignId);

    }
    @PatchMapping("/update-info/{customerId}/{campaignId}")
    public List<WinnerResponse> updateAnswer(@RequestBody Customer customer, @PathVariable Long customerId, @PathVariable String campaignId)
    {
        return answerService.updateCustomerInfo(customerId, customer, campaignId);
    }

    @GetMapping("/{campaignId}")
    public CampaignResponse getCampaignById(@PathVariable String campaignId) {
        return campaignService.getCampaignById(campaignId);
    }
}

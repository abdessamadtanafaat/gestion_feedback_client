package com.app.api.repositories;

import com.app.api.entities.Campaign.Campaign;
import com.app.api.entities.Campaign.LoyaltyProgramme;
import com.app.api.entities.Campaign.MysteryBoxConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LoyaltyProgrammeRepository extends JpaRepository<LoyaltyProgramme, Long> {

    @Query(value = "SELECT l.* FROM loyalty_programme l JOIN campaigns c ON l.campaign_id=c.id   WHERE c.campaign_id=?1 AND loyalty_programme_type_id=?2", nativeQuery = true)
    LoyaltyProgramme findByCampaignAndType(String campaignId, Long typeId);


}

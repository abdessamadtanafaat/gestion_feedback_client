package com.app.api.repositories;

import com.app.api.entities.Campaign.MysteryBoxConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MysteryBoxConfigRepo extends JpaRepository<MysteryBoxConfig, Long> {

    @Query(value = "SELECT mb.* FROM mystery_box_config mb JOIN loyalty_programme lp ON mb.program_id = lp.id JOIN campaigns c ON lp.campaign_id=c.id WHERE c.campaign_id=?1 AND lp.loyalty_programme_type_id=2;", nativeQuery = true)
    List<MysteryBoxConfig> getAllPrizesConfigByCampaign(String campaignId);
    

}

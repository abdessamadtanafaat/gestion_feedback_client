package com.app.api.repositories;

import com.app.api.entities.Campaign.CouponCodeConfig;
import com.app.api.entities.Campaign.MysteryBoxConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CouponCodeConfigRepo extends JpaRepository<CouponCodeConfig, Long> {
    @Query(value = "SELECT cp.* FROM coupon_code_config cp JOIN loyalty_programme lp ON cp.program_id = lp.id JOIN campaigns c ON lp.campaign_id=c.id WHERE c.campaign_id=?1 AND lp.loyalty_programme_type_id=3;", nativeQuery = true)
    List<CouponCodeConfig> getAllCouponsConfigByCampaign(String campaignId);
}

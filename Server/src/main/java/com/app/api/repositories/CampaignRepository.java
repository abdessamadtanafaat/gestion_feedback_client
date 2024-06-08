package com.app.api.repositories;

import com.app.api.entities.Campaign.Campaign;
import com.app.api.entities.Campaign.ServiceArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CampaignRepository extends JpaRepository<Campaign,Long> {
    Campaign findByCampaignId(String campaignId);
    @Query(value="SELECT * FROM campaigns c WHERE c.business_id = ?1", nativeQuery = true)
    List<Campaign> findByBusinessId(int businessId);
    @Query(value="SELECT c.*, b.id AS b_id,b.user_id,b.business_name,b.cover_image_url FROM campaigns c JOIN business b ON c.business_id = b.id WHERE b.user_id = ?1", nativeQuery = true)
    List<Campaign> findCampaignsByUser(int userId);

    @Query(value = "SELECT c.id, b.business_name, b.cover_image_url FROM campaigns c JOIN business b ON c.business_id = b.id JOIN loyalty_programme l ON l.campaign_id = c.id\n" +
            "JOIN loyalty_programme_type lt ON l.loyalty_programme_type_id=lt.id WHERE lt.type_name= ?1 AND b.user_id= ?2", nativeQuery = true)
    List<Object> getCampaignsByProgramType(String programType, int userId);

    @Query(value = "SELECT l.coupon_code,l.coupon_value,l.coupon_code_status,l.min_age,l.max_age,l.genders from loyalty_programme l JOIN loyalty_programme_type lt ON l.loyalty_programme_type_id = lt.id  WHERE lt.type_name=\"coupon code\" AND l.campaign_id=?1", nativeQuery = true)
    List<Object> getAllCouponsCodeByCampaign(Long campaignId);




}

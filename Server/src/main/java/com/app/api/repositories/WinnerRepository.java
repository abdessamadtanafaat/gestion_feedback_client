package com.app.api.repositories;

import com.app.api.entities.Campaign.CouponCodeConfig;
import com.app.api.entities.Campaign.Winner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WinnerRepository extends JpaRepository<Winner,Long> {
    @Query(value = "SELECT w.* FROM winners w JOIN loyalty_programme lp ON w.program_id = lp.id \n" +
            "JOIN campaigns c ON lp.campaign_id = c.id WHERE lp.loyalty_programme_type_id=2 AND c.campaign_id = ?1", nativeQuery = true)
    List<Winner> getAllMysteryBoxWinnersByCampaign(String campaignId);

    @Query(value = "SELECT w.* FROM winners w JOIN loyalty_programme lp ON w.program_id = lp.id \n" +
            "JOIN campaigns c ON lp.campaign_id = c.id WHERE lp.loyalty_programme_type_id=3 AND c.campaign_id = ?1", nativeQuery = true)
    List<Winner> getAllDiscountWinnersByCampaign(String campaignId);



    @Query(value = "SELECT w.* FROM winners w WHERE w.config_id= ?1", nativeQuery = true)
    List<Winner> getAllDiscountWinnersByGroup(long couponGroupId);

    List<Winner> findByConfig(CouponCodeConfig couponCode);
}

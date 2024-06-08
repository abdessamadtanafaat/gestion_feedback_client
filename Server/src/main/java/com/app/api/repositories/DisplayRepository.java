package com.app.api.repositories;

import com.app.api.entities.Campaign.Campaign;
import com.app.api.entities.Campaign.Display;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DisplayRepository extends JpaRepository<Display, Long> {
    @Query(value = "SELECT d.* FROM displays d " +
            "INNER JOIN campaigns c ON d.campaign_id = c.id " +
            "INNER JOIN business b ON c.business_id = b.id " +
            "INNER JOIN users u ON b.user_id = u.id " +
            "WHERE u.id = :userId " +
            "ORDER BY d.id DESC", nativeQuery = true)
    List<Display> getAllDisplays(@Param("userId") int userId);

    @Query(value="SELECT d.* FROM displays d WHERE d.campaign_id = ?1", nativeQuery = true)
    Display getDisplayByCampaignId(long id);
}

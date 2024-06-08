package com.app.api.repositories;

import com.app.api.entities.Campaign.Customer_Services_rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerServicesRatingRepository extends JpaRepository<Customer_Services_rating,Long> {

    @Query(value = "SELECT \n" +
            "    sa.id AS ServiceAreaID,\n" +
            "    sa.name AS ServiceAreaName,\n" +
            "    AVG(csr.customer_rating) AS AverageCustomerRating\n" +
            "FROM \n" +
            "    Customer_Services_rating csr\n" +
            "JOIN \n" +
            "    service_area sa ON csr.service_area_id = sa.id\n" +

            "WHERE \n" +
            "    csr.campaign_id = ?1 \n" +
            "GROUP BY \n" +
            "    sa.id, sa.name;", nativeQuery = true)
    List<Object[]> getAvgCustomerRatingForEveryService(String campaignId);
}

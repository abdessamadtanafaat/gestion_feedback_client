package com.app.api.repositories;

import com.app.api.entities.Campaign.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {
    @Query(value = "SELECT * FROM Customer WHERE email IS NULL AND name IS NULL AND tel IS NULL " +
            "AND id IN (SELECT customer_id FROM answers a JOIN  campaigns c ON a.campaign_id = c.id WHERE c.campaign_id = ?1)", nativeQuery = true)
    List<Customer> getAnonymousData(String campaignId);


    @Query(value = "SELECT * FROM Customer WHERE email IS NOT NULL AND name IS NOT NULL AND tel IS NOT NULL " +
            "AND id IN (SELECT customer_id FROM answers a JOIN campaigns c ON a.campaign_id = c.id WHERE c.campaign_id = ?1)", nativeQuery = true)
    List<Customer> findAllCustomers(String campaignId);

    @Query(value = "SELECT " +
            "    SUM(CASE WHEN name IS NOT NULL AND email IS NOT NULL AND tel IS NOT NULL THEN 1 ELSE 0 END) AS defined, " +
            "    SUM(CASE WHEN name IS NULL OR email IS NULL OR tel IS NULL THEN 1 ELSE 0 END) AS anonymous " +
            "FROM " +
            "    customer " +
            "    JOIN answers ON answers.customer_id = customer.id " +
            "    JOIN campaigns ON answers.campaign_id = campaigns.id " +
            "WHERE " +
            "    campaigns.campaign_id = :campaignId", nativeQuery = true)
    List<Map<String, Integer>> getAllCustomers(@Param("campaignId") String campaignId);





    @Query(value = "SELECT gender, COUNT(*) AS count " +
            "FROM customer " +
            "JOIN answers ON answers.customer_id = customer.id " +
            "JOIN campaigns ON answers.campaign_id = campaigns.id " +
            "WHERE campaigns.campaign_id = ?1 " +
            "GROUP BY gender;", nativeQuery = true)
    List<Object[]> getCustomersByGender(String campaignId);

    @Query(value = "SELECT " +
            "    CASE " +
            "        WHEN age BETWEEN 18 AND 22 THEN '18-22' " +
            "        WHEN age BETWEEN 23 AND 34 THEN '23-34' " +
            "        WHEN age BETWEEN 35 AND 46 THEN '35-46' " +
            "        WHEN age BETWEEN 47 AND 60 THEN '47-60' " +
            "        WHEN age > 60 THEN '>60' " +
            "        ELSE 'Unknown' " +
            "    END AS age_range, " +
            "    COUNT(*) AS count " +
            "FROM " +
            "    customer " +
            "    JOIN answers ON answers.customer_id = customer.id  " +
            "    JOIN campaigns ON answers.campaign_id = campaigns.id " +
            "WHERE  " +
            "    campaigns.campaign_id = :campaignId " +
            "GROUP BY  " +
            "    age_range ", nativeQuery = true)
    List<Object[]> getCustomersByAge(@Param("campaignId") String campaignId);




}

package com.app.api.repositories;

import com.app.api.entities.Campaign.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {

    @Query(value = "SELECT COUNT(*) FROM answers a JOIN campaigns c ON a.campaign_id = c.id WHERE c.campaign_id = ?1", nativeQuery = true)
    Integer countNumberOfAnswersForCampaign(String campaignId);

    @Query(value = "SELECT COALESCE(AVG(nps_value), 0) FROM answers a JOIN campaigns c ON a.campaign_id = c.id WHERE c.campaign_id = ?1", nativeQuery = true)
    Integer avgOfNpsForCampaign(String campaignId);


    @Query(value = "SELECT \n" +
            "    \n" +
            "    COALESCE(ROUND(AVG(csr.customer_rating) * 20, 2), 0) AS global_csat_percentage\n" +
            "FROM \n" +
            "    campaigns c\n" +
            "LEFT JOIN \n" +
            "    answers a ON c.id = a.campaign_id\n" +
            "LEFT JOIN \n" +
            "    Customer_Services_rating csr ON a.id = csr.answer_id\n" +
            "WHERE \n" +
            "    c.campaign_id = ?1", nativeQuery = true)
    Integer calculateCsat(String campaignId);
}

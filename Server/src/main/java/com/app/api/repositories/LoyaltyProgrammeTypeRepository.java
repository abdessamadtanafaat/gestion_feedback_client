package com.app.api.repositories;

import com.app.api.entities.Campaign.LoyaltyProgrammeType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoyaltyProgrammeTypeRepository extends JpaRepository<LoyaltyProgrammeType,Long> {

    LoyaltyProgrammeType findByLoyaltyProgrammeTypeId(String loyaltyProgrammeTypeId);
    LoyaltyProgrammeType findByTypeName(String type);

}

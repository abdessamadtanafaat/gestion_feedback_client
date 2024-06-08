package com.app.api.repositories;

import com.app.api.entities.Campaign.ServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ServiceCategoryRepository extends JpaRepository<ServiceCategory,Long> {
    ServiceCategory findByServiceCategoryId(String serviceCategoryId);
//    @Query("SELECT DISTINCT sc FROM ServiceCategory sc JOIN sc.serviceAreas sa WHERE sa.user.id = :userId")
//    List<ServiceCategory> findAllServicesByUserId(@Param("userId") Long userId);
    ServiceCategory findByName(String categoryName);
}

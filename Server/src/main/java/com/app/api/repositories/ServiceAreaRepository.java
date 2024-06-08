package com.app.api.repositories;

import com.app.api.entities.Campaign.ServiceArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ServiceAreaRepository extends JpaRepository<ServiceArea,Long> {
    @Query(value="SELECT * FROM service_area s WHERE s.service_category_id = ?1", nativeQuery = true)
    List<ServiceArea> findByServiceCategory(Long serviceCategoryId);

    @Query(value="SELECT * FROM service_area s WHERE s.name = ?1 and s.user_id= ?2", nativeQuery = true)
    ServiceArea existService(String serviceName, int userId);



}

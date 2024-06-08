package com.app.api.entities.Campaign;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ServiceCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @UuidGenerator
    @Column(name = "serviceCategoryId", unique = true, updatable = false)
    private String serviceCategoryId;
    private String name;
    private String description;
    private String photoUrl;

    @OneToMany(mappedBy = "serviceCategory")
    private List<ServiceArea> serviceAreas;

}
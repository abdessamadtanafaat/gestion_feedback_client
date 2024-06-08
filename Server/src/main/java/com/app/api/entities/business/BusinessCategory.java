package com.app.api.entities.business;

import com.app.api.entities.Campaign.ServiceArea;
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
@Entity(name = "BusinessCategory")
public class BusinessCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @UuidGenerator
    @Column(name = "businessCategoryId", unique = true, updatable = false)
    private String businessCategoryId;
    private String categoryName;
    private String photoUrl;
}

package com.app.api.entities.business;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "BusinessType")
public class BusinessType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @UuidGenerator
    @Column(name = "businessTypeId", unique = true, updatable = false)
    private String businessTypeId;
    private String typeName;
    private String photoUrl;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private BusinessCategory category;


}

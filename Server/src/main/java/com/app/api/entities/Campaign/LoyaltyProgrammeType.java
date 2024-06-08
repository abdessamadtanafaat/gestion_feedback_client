package com.app.api.entities.Campaign;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonInclude(JsonInclude.Include.NON_DEFAULT)
public class LoyaltyProgrammeType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @UuidGenerator
    @Column(name = "loyaltyProgrammeTypeId", unique = true, updatable = false)
    private String loyaltyProgrammeTypeId;
    private String typeName;
    private String photoUrl;
}

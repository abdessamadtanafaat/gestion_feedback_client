package com.app.api.entities.Campaign;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class CouponCodeConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String couponCode;
    private boolean couponCodeStatus;
    private double couponValue;
    private Integer minAge;
    private Integer maxAge;
    private String gender;
    @ManyToOne
    @JoinColumn(name = "program_id")
    private LoyaltyProgramme program;


}

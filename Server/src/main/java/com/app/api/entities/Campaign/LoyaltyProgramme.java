package com.app.api.entities.Campaign;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class LoyaltyProgramme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToMany(mappedBy = "program", cascade = CascadeType.ALL)
    private List<MysteryBoxConfig> mysteryBoxConfigs;
    @OneToMany(mappedBy = "program", cascade = CascadeType.ALL)
    private List<CouponCodeConfig> couponCodeConfigs;

    //private Integer npsValue;
    @ManyToOne
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;
    @ManyToOne
    @JoinColumn(name = "loyalty_programme_type_id")
    private LoyaltyProgrammeType loyaltyProgrammeType;



}

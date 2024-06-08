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
public class MysteryBoxConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String mysteryBoxPrize;
    private String prizeImageUrl;
    private Integer prizeQuantity;
    private Integer prizeFrequency;
    private Integer minAge;
    private Integer maxAge;
    private String gender;
    @ManyToOne
    @JoinColumn(name = "program_id")
    private LoyaltyProgramme program;


}

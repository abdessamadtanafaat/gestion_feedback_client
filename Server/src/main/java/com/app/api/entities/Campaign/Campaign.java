package com.app.api.entities.Campaign;

import com.app.api.entities.business.Business;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="campaigns")
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @UuidGenerator
    @Column(name = "campaignId", unique = true, updatable = false)
    private String campaignId;
    @ManyToMany
    @JoinTable(
            name = "campaign_service_area",
            joinColumns = @JoinColumn(name = "campaign_id"),
            inverseJoinColumns = @JoinColumn(name = "service_area_id"))
    private List<ServiceArea> serviceAreas ;

    @ManyToOne
    @JoinColumn(name = "business_id")
    private Business business;
    @OneToMany(mappedBy = "campaign")
    private List<LoyaltyProgramme> loyaltyProgrammes;


    @ManyToOne
    @JoinColumn(name = "template_id")
    private Template template;


    @ManyToMany
    @JoinTable(
            name = "campaign_language",
            joinColumns = @JoinColumn(name = "campaign_id"),
            inverseJoinColumns = @JoinColumn(name = "language_id")
    )
    private List<Language> languages;

    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL)
    private List<Display> displays;

}

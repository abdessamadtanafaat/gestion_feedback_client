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
public class Customer_Services_rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "answer_id")
    private Answer answer;
    @ManyToOne
    @JoinColumn(name = "service_area_id")
    private ServiceArea serviceArea;
    private int customerRating;
    private String campaign_Id;


}

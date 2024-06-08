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
@Entity(name="displays")
public class Display {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000) // Adjust the length as necessary
    private String qrCode;
    private int numberOfScans;

    @ManyToOne
    @JoinColumn(name = "campaignId", referencedColumnName = "id")
    private Campaign campaign;
}

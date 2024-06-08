package com.app.api.entities.Campaign;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "winners")
public class Winner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String discountCodeReference;
    private String mysteryBoxPrize;
    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "program_id", referencedColumnName = "id")
    private LoyaltyProgramme program;

    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private LocalDateTime winningDate;
    @ManyToOne
    @JoinColumn(name = "config_id", referencedColumnName = "id")
    private CouponCodeConfig config;




}

package com.app.api.entities.Campaign;

import com.app.api.entities.user.UserEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ServiceArea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private boolean isPrivate;
    @ManyToOne
    @JoinColumn(name = "service_category_id")
    private ServiceCategory serviceCategory;
    @ManyToMany(mappedBy = "serviceAreas")
    private List<Campaign> campaigns ;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;



}

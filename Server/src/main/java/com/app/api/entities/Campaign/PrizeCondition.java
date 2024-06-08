package com.app.api.entities.Campaign;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class PrizeCondition {
    private int minAge;
    private int maxAge;
    private String genders;
    private int frequency;




    public void setGenders(String... genders) {
        this.genders = String.join(",", genders);
    }

    public String[] getGenders() {
        return genders.split(",");
    }
}

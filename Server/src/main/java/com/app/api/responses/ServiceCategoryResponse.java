package com.app.api.responses;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceCategoryResponse {

    private Long id;
    private String name;
    private String description;
    private String photoUrl;

    private List<ServiceAreaResponse> serviceAreas;
}

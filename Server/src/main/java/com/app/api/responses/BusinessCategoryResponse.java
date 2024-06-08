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
public class BusinessCategoryResponse {
    private Long id;
    private String categoryName;
    private String photoUrl;
    private List<BusinessTypeResponse> businessTypeList;
}

package com.app.api.responses;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceAreaResponse {
    private Long id;
    private String name;
    private boolean isPrivate;


}

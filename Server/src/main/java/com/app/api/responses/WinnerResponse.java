package com.app.api.responses;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WinnerResponse {
    private String name;
    private String email;
    private String tel;
    private LocalDateTime winningDate;
    private Integer programmeTypeId;
    private String discountCodeReference;
    private String mysteryBoxPrize;
}

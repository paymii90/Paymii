package com.paymii.backend.dtos.portfolio;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PortfolioResponseDTO {
    private String coin_id;
    private String coin_name;
    private String coin_symbol;
    private String coin_image;
    private double amount;
    private double totalValue;
}

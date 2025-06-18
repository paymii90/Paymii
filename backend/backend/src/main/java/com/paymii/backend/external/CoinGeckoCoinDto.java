package com.paymii.backend.external;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class CoinGeckoCoinDto {
    private String id;
    private String symbol;
    private String name;

    @JsonProperty("current_price")
    private double currentPrice;

    // Add other fields as needed (e.g. image)
}

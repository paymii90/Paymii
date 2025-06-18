package com.paymii.backend.dtos.coin;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CoinDto {
    private Integer id;
    private String name;
    private String symbol;
    private BigDecimal currentPrice;
}

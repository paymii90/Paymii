package com.paymii.backend.dtos.transaction;

import java.math.BigDecimal;

public class ConvertRequest {
    public Long userId;
    public String fromCoinId;
    public String fromCoinName;
    public String fromCoinSymbol;
    public String fromCoinImage;
    public BigDecimal fromCoinPrice;

    public String toCoinId;
    public String toCoinName;
    public String toCoinSymbol;
    public String toCoinImage;
    public BigDecimal toCoinPrice;

    public BigDecimal amount;
}

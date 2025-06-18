package com.paymii.backend.dtos.transaction;

import java.math.BigDecimal;

public class BuyRequest {
    public Long userId;
    public String coinId;        // CoinGecko ID or frontend coinId
    public String coinName;
    public String coinSymbol;
    public String coinImage;
    public BigDecimal coinPrice;
    public BigDecimal amount;
    public String paymentMethod;
}

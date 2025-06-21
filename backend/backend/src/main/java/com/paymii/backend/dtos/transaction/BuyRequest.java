package com.paymii.backend.dtos.transaction;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Data
public class BuyRequest {
    public Long userId;
    public String coinId;        // CoinGecko ID or frontend coinId
    public String coinName;
    public String coinSymbol;
    public String coinImage;
    public BigDecimal coinPrice;
    public BigDecimal amount;
    public String paymentMethod;
    public BigDecimal coinQuantity;

}

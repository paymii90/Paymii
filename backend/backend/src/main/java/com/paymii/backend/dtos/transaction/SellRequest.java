package com.paymii.backend.dtos.transaction;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class SellRequest {
    public String userId;
    public String coinId;
    public String coinName;
    public String coinSymbol;
    public String coinImage;
    public BigDecimal coinPrice;
    public BigDecimal amount;
    public BigDecimal coinQuantity;
    public String paymentMethod;
}

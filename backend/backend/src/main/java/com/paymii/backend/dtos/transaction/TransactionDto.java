package com.paymii.backend.dtos.transaction;

import lombok.Data;
import java.math.BigDecimal;
import java.time.Instant;

@Data
public class TransactionDto {
    private Long id;
    private BigDecimal amount;
    private String coinId;
    private String coinName;
    private String coinSymbol;
    private String coinImage;
    private BigDecimal coinPrice;
    private String details;
    private String type;
    private Instant timestamp;
    private BigDecimal coinQuantity;

}

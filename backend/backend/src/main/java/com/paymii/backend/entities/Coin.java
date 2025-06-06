package com.paymii.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "coins")
public class Coin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Size(max = 50)
    @NotNull
    @Column(name = "name", length = 50)
    private String name;

    @Size(max = 10)
    @NotNull
    @Column(name = "symbol", length = 10)
    private String symbol;

    @Column(name = "current_price", precision = 18, scale = 8)
    private BigDecimal currentPrice;

}
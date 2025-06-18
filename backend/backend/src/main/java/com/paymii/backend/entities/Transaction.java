package com.paymii.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "amount", nullable = false, precision = 20, scale = 8)
    private BigDecimal amount;

    @Size(max = 255)
    @Column(name = "details")
    private String details;

    @NotNull
    @Column(name = "\"timestamp\"", nullable = false)
    private Instant timestamp;

    @Size(max = 255)
    @NotNull
    @Column(name = "type", nullable = false)
    private String type;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // The coin fields from frontend:
    @Size(max = 255)
    @NotNull
    @Column(name = "coin_id", nullable = false)
    private String coinId;

    @Size(max = 255)
    @Column(name = "coin_name")
    private String coinName;

    @Size(max = 255)
    @Column(name = "coin_symbol")
    private String coinSymbol;

    @Size(max = 255)
    @Column(name = "coin_image")
    private String coinImage;

    @Column(name = "coin_price", precision = 20, scale = 8)
    private BigDecimal coinPrice;
}

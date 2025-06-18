package com.paymii.backend.mappers;

import com.paymii.backend.dtos.coin.CoinDto;
import com.paymii.backend.entities.Coin;
import com.paymii.backend.external.CoinGeckoCoinDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CoinMapper {
    CoinDto toDto(Coin coin);
    Coin toEntity(CoinDto coinDto);
    Coin toEntity(CoinGeckoCoinDto coinGeckoCoinDto);
}

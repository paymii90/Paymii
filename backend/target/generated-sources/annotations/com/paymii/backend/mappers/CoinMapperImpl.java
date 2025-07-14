package com.paymii.backend.mappers;

import com.paymii.backend.dtos.coin.CoinDto;
import com.paymii.backend.entities.Coin;
import com.paymii.backend.external.CoinGeckoCoinDto;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-28T23:03:08+0000",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.15 (Microsoft)"
)
@Component
public class CoinMapperImpl implements CoinMapper {

    @Override
    public CoinDto toDto(Coin coin) {
        if ( coin == null ) {
            return null;
        }

        CoinDto coinDto = new CoinDto();

        return coinDto;
    }

    @Override
    public Coin toEntity(CoinDto coinDto) {
        if ( coinDto == null ) {
            return null;
        }

        Coin coin = new Coin();

        return coin;
    }

    @Override
    public Coin toEntity(CoinGeckoCoinDto coinGeckoCoinDto) {
        if ( coinGeckoCoinDto == null ) {
            return null;
        }

        Coin coin = new Coin();

        return coin;
    }
}

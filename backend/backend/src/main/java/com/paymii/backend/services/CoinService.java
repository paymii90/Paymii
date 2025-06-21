package com.paymii.backend.services;

import com.paymii.backend.dtos.coin.CoinDto;
import java.util.List;

public interface CoinService {
    List<CoinDto> getAllCoins();
    CoinDto getCoinById(Integer id);
    CoinDto addCoin(CoinDto coinDto);
    void refreshFromCoinGecko();
    void populateCoinsFromCoinGecko();
}

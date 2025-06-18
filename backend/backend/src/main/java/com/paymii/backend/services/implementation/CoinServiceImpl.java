package com.paymii.backend.services.implementation;

import com.paymii.backend.dtos.coin.CoinDto;
import com.paymii.backend.entities.Coin;
import com.paymii.backend.external.CoinGeckoCoinDto;
import com.paymii.backend.external.CoinGeckoService;
import com.paymii.backend.mappers.CoinMapper;
import com.paymii.backend.repositories.CoinRepository;
import com.paymii.backend.services.CoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CoinServiceImpl implements CoinService {
    private final CoinRepository coinRepository;

    @Autowired
    private final CoinMapper coinMapper;

    @Autowired
    private CoinGeckoService coinGeckoService;

    @Override
    public List<CoinDto> getAllCoins() {
        return coinRepository.findAll()
                .stream()
                .map(coinMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CoinDto getCoinById(Integer id) {
        Coin coin = coinRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coin not found with id: " + id));
        return coinMapper.toDto(coin);
    }

    @Override
    public CoinDto addCoin(CoinDto coinDto) {
        Coin coin = coinMapper.toEntity(coinDto);
        coin = coinRepository.save(coin);
        return coinMapper.toDto(coin);
    }
    public void refreshFromCoinGecko() {
        // List of coin IDs to fetch from CoinGecko
        List<String> ids = List.of("bitcoin", "ethereum", "litecoin");

        List<CoinGeckoCoinDto> coins = coinGeckoService.fetchCoins(ids).block(); // Synchronous call

        if (coins != null) {
            for (CoinGeckoCoinDto apiCoin : coins) {
                Coin coin = coinRepository.findBySymbol(apiCoin.getSymbol()).orElse(new Coin());
                coin.setName(apiCoin.getName());
                coin.setSymbol(apiCoin.getSymbol());
                coin.setCurrentPrice(BigDecimal.valueOf(apiCoin.getCurrentPrice()));
                coinRepository.save(coin);
            }

        }
    }
    public void populateCoinsFromCoinGecko() {
        List<CoinGeckoCoinDto> coinsFromApi = coinGeckoService.fetchAllMarketCoins().block();

        if (coinsFromApi != null) {
            for (CoinGeckoCoinDto apiCoin : coinsFromApi) {
                Coin coin = coinMapper.toEntity(apiCoin); // MapStruct will do the field mapping!
                coinRepository.save(coin);
            }
        }
    }



}

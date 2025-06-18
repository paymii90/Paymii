package com.paymii.backend.controllers.coin;

import com.paymii.backend.dtos.coin.CoinDto;
import com.paymii.backend.services.CoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/coins")
@RequiredArgsConstructor
public class CoinController {
    private final CoinService coinService;

    @GetMapping
    public List<CoinDto> getAllCoins() {
        return coinService.getAllCoins();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CoinDto> getCoinById(@PathVariable Integer id) {
        try {
            CoinDto coin = coinService.getCoinById(id);
            return ResponseEntity.ok(coin);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public CoinDto addCoin(@RequestBody CoinDto coinDto) {
        return coinService.addCoin(coinDto);
    }
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshFromCoinGecko() {
        coinService.refreshFromCoinGecko();
        return ResponseEntity.ok("Coin data updated from CoinGecko!");
    }
    @PostMapping("/populate")
    public ResponseEntity<?> populateCoinsFromCoinGecko() {
        coinService.populateCoinsFromCoinGecko();
        return ResponseEntity.ok("Database populated with coins from CoinGecko!");
    }


}

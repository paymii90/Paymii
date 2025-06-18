package com.paymii.backend.external;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.List;

@Service
public class CoinGeckoService {

    private final WebClient webClient;

    // Inject a WebClient.Builder
    public CoinGeckoService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.coingecko.com/api/v3").build();
    }

    public Mono<List<CoinGeckoCoinDto>> fetchCoins(List<String> ids) {
        String idsParam = String.join(",", ids);
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/coins/markets")
                        .queryParam("vs_currency", "usd")
                        .queryParam("ids", idsParam)
                        .build())
                .retrieve()
                .bodyToFlux(CoinGeckoCoinDto.class)
                .collectList();
    }

    public Mono<List<CoinGeckoCoinDto>> fetchAllMarketCoins() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/coins/markets")
                        .queryParam("vs_currency", "usd")
                        .queryParam("order", "market_cap_desc")
                        .queryParam("per_page", 50)
                        .queryParam("page", 1)
                        .build())
                .retrieve()
                .bodyToFlux(CoinGeckoCoinDto.class)
                .collectList();
    }

}

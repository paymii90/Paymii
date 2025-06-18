package com.paymii.backend.controllers.transaction;

import com.paymii.backend.dtos.transaction.*;
import com.paymii.backend.services.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.paymii.backend.entities.Transaction;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/buy")
    public Transaction buy(@RequestBody BuyRequest req) {

        return transactionService.buy(req);
    }

    @PostMapping("/sell")
    public Transaction sell(@RequestBody SellRequest req) {

        return transactionService.sell(req);
    }

    @PostMapping("/send")
    public Transaction send(@RequestBody SendRequest req) {
        return transactionService.send(req);
    }

    @PostMapping("/withdraw")
    public Transaction withdraw(@RequestBody WithdrawRequest req) {
        return transactionService.withdraw(req);
    }

    @PostMapping("/deposit")
    public Transaction deposit(@RequestBody DepositRequest req) {
        return transactionService.deposit(req);
    }

    @PostMapping("/convert")
    public List<Transaction> convert(@RequestBody ConvertRequest req) {
        return transactionService.convert(req);
    }

    @GetMapping("/history/{userId}")
    public List<Transaction> history(@PathVariable Long userId){

        return transactionService.getHistory(userId);
    }
}

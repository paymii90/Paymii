package com.paymii.backend.mappers;

import com.paymii.backend.dtos.transaction.TransactionDto;
import com.paymii.backend.entities.Transaction;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-28T23:03:08+0000",
    comments = "version: 1.6.3, compiler: javac, environment: Java 17.0.15 (Microsoft)"
)
@Component
public class TransactionMapperImpl implements TransactionMapper {

    @Override
    public TransactionDto toDto(Transaction transaction) {
        if ( transaction == null ) {
            return null;
        }

        TransactionDto transactionDto = new TransactionDto();

        return transactionDto;
    }
}

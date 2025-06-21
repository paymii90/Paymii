package com.paymii.backend.mappers;

import com.paymii.backend.entities.Transaction;
import com.paymii.backend.dtos.transaction.TransactionDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TransactionMapper {
    TransactionDto toDto(Transaction transaction);
}

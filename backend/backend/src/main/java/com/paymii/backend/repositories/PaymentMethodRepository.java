package com.paymii.backend.repositories;

import com.paymii.backend.entities.PaymentMethod;
import com.paymii.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {
    List<PaymentMethod> findAllByUser(User user);
}

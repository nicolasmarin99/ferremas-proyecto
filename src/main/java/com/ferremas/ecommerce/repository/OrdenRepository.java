package com.ferremas.ecommerce.repository;

import com.ferremas.ecommerce.model.Orden;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdenRepository extends JpaRepository<Orden, Long> {
}

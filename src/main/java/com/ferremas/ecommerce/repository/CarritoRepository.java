package com.ferremas.ecommerce.repository;

import com.ferremas.ecommerce.model.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {
}

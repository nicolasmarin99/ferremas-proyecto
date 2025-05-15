package com.ferremas.ecommerce.service;

import com.ferremas.ecommerce.model.Producto;
import java.util.List;

public interface ProductoService {
    List<Producto> obtenerTodos();
    Producto obtenerPorCodigo(String codigo);
    Producto obtenerPorId(Long id);  // ✅ solo la declaración aquí
    Producto guardarProducto(Producto producto);
}
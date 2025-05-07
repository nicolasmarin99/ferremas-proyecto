package com.ferremas.ecommerce.service;

import com.ferremas.ecommerce.model.Orden;
import com.ferremas.ecommerce.model.Producto;
import com.ferremas.ecommerce.repository.OrdenRepository;
import com.ferremas.ecommerce.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrdenService {

    @Autowired
    private OrdenRepository ordenRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public List<Orden> obtenerTodas() {
        return ordenRepository.findAll();
    }

    public Orden crearOrden(Orden orden) {
        List<Producto> productosAdjuntos = new ArrayList<>();

        for (Producto p : orden.getProductos()) {
            Producto productoReal = productoRepository.findById(p.getId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + p.getId()));
            productosAdjuntos.add(productoReal);
        }

        orden.setProductos(productosAdjuntos);
        orden.setFecha(LocalDateTime.now());
        orden.setEstado("PENDIENTE");

        return ordenRepository.save(orden);
    }
}

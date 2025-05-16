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
    orden.setFecha(LocalDateTime.now());
    orden.setEstado("PENDIENTE");

    // Asignar los items correctamente
    if (orden.getItems() != null) {
        for (var item : orden.getItems()) {
            item.setOrden(orden); // vincula cada item con la orden
        }
    }

    return ordenRepository.save(orden);
}
}

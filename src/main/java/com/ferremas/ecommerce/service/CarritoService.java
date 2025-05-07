package com.ferremas.ecommerce.service;

import com.ferremas.ecommerce.model.Carrito;
import com.ferremas.ecommerce.model.Producto;
import com.ferremas.ecommerce.repository.CarritoRepository;
import com.ferremas.ecommerce.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CarritoService {

    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public List<Carrito> obtenerTodos() {
        return carritoRepository.findAll();
    }

    public Carrito guardar(Carrito carrito) {
        List<Producto> productosAdjuntos = new ArrayList<>();

        for (Producto producto : carrito.getProductos()) {
            Producto productoAdjunto = productoRepository.findById(producto.getId())
                    .orElseThrow(() -> new RuntimeException("Producto no encontrado: " + producto.getId()));
            productosAdjuntos.add(productoAdjunto);
        }

        carrito.setProductos(productosAdjuntos);
        return carritoRepository.save(carrito);
    }
}

package com.ferremas.ecommerce.controller;

import com.ferremas.ecommerce.model.Cliente;
import com.ferremas.ecommerce.model.Orden;
import com.ferremas.ecommerce.model.OrdenItem;
import com.ferremas.ecommerce.model.Producto;
import com.ferremas.ecommerce.model.PagoRequest;
import com.ferremas.ecommerce.repository.ClienteRepository;
import com.ferremas.ecommerce.repository.OrdenItemRepository;
import com.ferremas.ecommerce.repository.OrdenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ferremas.ecommerce.repository.ProductoRepository;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PagoController {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private OrdenRepository ordenRepository;

    @Autowired
    private OrdenItemRepository ordenItemRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @PostMapping("/simular-pago")
public ResponseEntity<?> simularPago(@RequestBody PagoRequest request) {
    try {
        // 1. Guardar cliente
        Cliente cliente = clienteRepository.save(request.getCliente());

        // 2. Crear orden
        Orden orden = new Orden();
        orden.setCliente(cliente);
        orden.setTotal(request.getTotal());
        orden.setEstado("Pagado");
        orden.setFecha(LocalDateTime.now());

        String nombreCompleto = cliente.getNombre() + " " + cliente.getApellido();
        orden.setUsuario(nombreCompleto);

        ordenRepository.save(orden);

        // 3. Procesar productos
        for (Producto producto : request.getProductos()) {
            Producto productoBD = productoRepository.findById(producto.getId())
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con ID: " + producto.getId()));

            int cantidad = producto.getCantidad() != null ? producto.getCantidad() : 1;

            if (productoBD.getStock() < cantidad) {
                throw new RuntimeException("❌ Stock insuficiente para el producto: " + productoBD.getNombre());
            }

            // Descontar stock
            productoBD.setStock(productoBD.getStock() - cantidad);
            productoRepository.save(productoBD);

            // Crear orden item
            OrdenItem item = new OrdenItem();
            item.setOrden(orden);
            item.setNombreProducto(productoBD.getNombre());
            item.setPrecio(productoBD.getPrecio() * cantidad);
            item.setCantidad(cantidad);
            ordenItemRepository.save(item);
        }

        return ResponseEntity.ok().body(Map.of(
            "mensaje", "✅ Compra procesada y stock actualizado",
            "ordenId", orden.getId()
        ));

    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("❌ Error al procesar compra: " + e.getMessage());
    }
}
}
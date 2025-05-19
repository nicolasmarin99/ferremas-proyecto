package com.ferremas.ecommerce.controller;

import com.ferremas.ecommerce.model.Cliente;
import com.ferremas.ecommerce.model.Orden;
import com.ferremas.ecommerce.model.OrdenItem;
import com.ferremas.ecommerce.model.Producto;
import com.ferremas.ecommerce.model.PagoRequest;
import com.ferremas.ecommerce.repository.ClienteRepository;
import com.ferremas.ecommerce.repository.OrdenItemRepository;
import com.ferremas.ecommerce.repository.OrdenRepository;
import com.ferremas.ecommerce.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

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
            // Guardar cliente
            Cliente cliente = clienteRepository.save(request.getCliente());

            // Crear orden
            Orden orden = new Orden();
            orden.setCliente(cliente);
            orden.setTotal(request.getTotal());
            orden.setEstado("Pagado");

            // Nombre de usuario en la orden
            String nombreCompleto = cliente.getNombre() + " " + cliente.getApellido();
            orden.setUsuario(nombreCompleto);
            orden.setFecha(LocalDateTime.now());

            ordenRepository.save(orden);

            // Procesar productos
            for (Producto producto : request.getProductos()) {
                Optional<Producto> optionalProductoBD = productoRepository.findById(producto.getId());

                if (optionalProductoBD.isEmpty()) {
                    System.err.println("⚠ Producto con ID " + producto.getId() + " no encontrado. Se omite.");
                    continue;
                }

                Producto productoBD = optionalProductoBD.get();
                int cantidad = producto.getCantidad() != null ? producto.getCantidad() : 1;

                if (productoBD.getStock() < cantidad) {
                    throw new RuntimeException("Stock insuficiente para: " + productoBD.getNombre());
                }

                productoBD.setStock(productoBD.getStock() - cantidad);
                productoRepository.save(productoBD);

                OrdenItem item = new OrdenItem();
                item.setNombreProducto(productoBD.getNombre());
                item.setPrecio(productoBD.getPrecio() * cantidad);
                item.setCantidad(cantidad);
                item.setOrden(orden);
                ordenItemRepository.save(item);
            }

            return ResponseEntity.ok().body(Map.of(
                    "mensaje", "✅ Pago simulado exitosamente",
                    "ordenId", orden.getId()
            ));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("❌ Error al simular el pago: " + e.getMessage());
        }
    }
}

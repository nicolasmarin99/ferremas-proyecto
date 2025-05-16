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

            // Asignar nombre completo como usuario
            String nombreCompleto = cliente.getNombre() + " " + cliente.getApellido();
            orden.setUsuario(nombreCompleto);

            // Asignar fecha actual
            orden.setFecha(LocalDateTime.now());

            // Guardar orden
            ordenRepository.save(orden);

            // Guardar ítems
            for (Producto producto : request.getProductos()) {
                OrdenItem item = new OrdenItem();
                item.setNombreProducto(producto.getNombre());
                item.setPrecio(producto.getPrecio());
                item.setOrden(orden);
                ordenItemRepository.save(item);
            }

            // Respuesta exitosa
            return ResponseEntity.ok().body(Map.of(
                "mensaje", "✅ Pago simulado exitosamente",
                "ordenId", orden.getId()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(500).body("❌ Error al simular el pago: " + e.getMessage());
        }
    }
}
package com.ferremas.ecommerce.controller;

import com.ferremas.ecommerce.model.Producto;
import com.ferremas.ecommerce.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoRepository productoRepository;

    // 🟢 Pública: lista todos los productos
    @GetMapping
    public List<Producto> obtenerProductos() {
        return productoRepository.findAll();
    }

    // 🟢 Pública: detalle por id
    @GetMapping("/{id}")
public ResponseEntity<?> obtenerPorId(@PathVariable Long id) {
    return productoRepository.findById(id)
            .<ResponseEntity<?>>map(p -> ResponseEntity.ok().body(p))
            .orElse(ResponseEntity.status(404).body("❌ Producto no encontrado"));
}

    // 🔒 Solo ADMINISTRADOR: agregar producto
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarProducto(@RequestBody Producto producto) {
        productoRepository.save(producto);
        return ResponseEntity.ok("✅ Producto agregado");
    }

    // 🔒 Solo ADMINISTRADOR: eliminar producto
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Long id) {
        if (productoRepository.existsById(id)) {
            productoRepository.deleteById(id);
            return ResponseEntity.ok("🗑️ Producto eliminado");
        } else {
            return ResponseEntity.status(404).body("❌ Producto no encontrado");
        }
    }

    // 🔒 Solo ADMINISTRADOR: actualizar producto
    @PutMapping("/editar/{id}")
    public ResponseEntity<?> editarProducto(@PathVariable Long id, @RequestBody Producto productoActualizado) {
        return productoRepository.findById(id).map(p -> {
            p.setNombre(productoActualizado.getNombre());
            p.setDescripcion(productoActualizado.getDescripcion());
            p.setPrecio(productoActualizado.getPrecio());
            p.setStock(productoActualizado.getStock());
            p.setCategoria(productoActualizado.getCategoria());
            p.setCodigo(productoActualizado.getCodigo());
            p.setMarca(productoActualizado.getMarca());
            p.setImagenUrl(productoActualizado.getImagenUrl());
            productoRepository.save(p);
            return ResponseEntity.ok("✏️ Producto actualizado");
        }).orElse(ResponseEntity.status(404).body("❌ Producto no encontrado"));
    }
}

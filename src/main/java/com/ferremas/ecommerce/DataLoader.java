package com.ferremas.ecommerce;

import com.ferremas.ecommerce.model.Producto;
import com.ferremas.ecommerce.repository.ProductoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final ProductoRepository productoRepository;

    public DataLoader(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (productoRepository.count() >= 0) {
            List<Producto> productos = List.of(
                new Producto(null, "FER-001", "Martillo", "Truper", 7990.0, 100, "Herramientas Manuales"),
                new Producto(null, "FER-002", "Lijadora Orbital", "Makita", 84990.0, 12, "Herramientas Eléctricas"),
                new Producto(null, "FER-003", "Casco de seguridad", "3M", 10990.0, 30, "Seguridad"),
                new Producto(null, "FER-004", "Pintura Acrílica Blanca", "Sherwin-Williams", 20990.0, 20, "Pinturas y Acabados"),
                new Producto(null, "FER-005", "Taladro Inalámbrico", "Bosch", 65990.0, 20, "Herramientas Eléctricas"),
                new Producto(null, "FER-006", "Sierra Circular", "DeWalt", 74990.0, 10, "Corte"),
                new Producto(null, "FER-007", "Caja de Herramientas", "Truper", 29990.0, 25, "Accesorios"),
                new Producto(null, "FER-008", "Destornillador de Precisión", "Stanley", 5990.0, 50, "Herramientas Manuales"),
                new Producto(null, "FER-009", "Guantes de Seguridad", "3M", 4990.0, 40, "Seguridad"),
                new Producto(null, "FER-010", "Pintura Esmalte Negro", "Ceresita", 18990.0, 18, "Pinturas y Acabados")
            );

            productoRepository.saveAll(productos);
            System.out.println("📦 Productos iniciales cargados.");
        }
    }
}

package com.ferremas.ecommerce;

import com.ferremas.ecommerce.model.Producto;
import com.ferremas.ecommerce.repository.OrdenRepository;
import com.ferremas.ecommerce.repository.ProductoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final ProductoRepository productoRepository;
    private final OrdenRepository ordenRepository;

    public DataLoader(ProductoRepository productoRepository, OrdenRepository ordenRepository) {
        this.productoRepository = productoRepository;
        this.ordenRepository = ordenRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Elimina primero las órdenes (por clave foránea) y luego los productos
        ordenRepository.deleteAll();
        productoRepository.deleteAll();

        List<Producto> productos = List.of(
            new Producto(null, "FER-001", "Martillo", "Truper", 7990.0, 100, "Herramientas Manuales",
                    "/img/martillo.jpg","Martillo de acero resistente ideal para carpintería."),
            new Producto(null, "FER-002", "Lijadora Orbital", "Makita", 84990.0, 12, "Herramientas Eléctricas",
                    "https://fi.makitamedia.com/images/3_Makita/301_machines/3011_a_GS1/30120_JPG_zoom/BO5031_C2L0.jpg","lijadora excelente para pulir o suavizar metales"),
            new Producto(null, "FER-003", "Casco de seguridad", "3M", 10990.0, 30, "Seguridad",
                    "https://www.kleintools.com.mx/sites/default/files/product-assets/catalog-imagery/original/klein/60105_c.jpg","casco de obsidiana supermega resistente anti radiacion"),
            new Producto(null, "FER-004", "Pintura Acrílica Blanca", "Sherwin-Williams", 20990.0, 20, "Pinturas y Acabados",
                    "https://http2.mlstatic.com/D_NQ_NP_872129-MLU73391877751_122023-O.webp","pintura que te puede convertir en invisible"),
            new Producto(null, "FER-005", "Taladro Inalámbrico", "Bosch", 65990.0, 20, "Herramientas Eléctricas",
                    "https://ferreantofagasta.cl/wp-content/uploads/2024/08/4.jpg","taladro megaduro de diamante con punta de adamantium"),
            new Producto(null, "FER-006", "Sierra Circular", "DeWalt", 74990.0, 10, "Corte",
                    "https://http2.mlstatic.com/D_NQ_NP_766379-MLC75463322310_042024-O.webp","cierra capaz de cortar montañas"),
            new Producto(null, "FER-007", "Caja de Herramientas", "Truper", 29990.0, 25, "Accesorios",
                    "https://m.media-amazon.com/images/I/71ZTBxK-5vL._AC_UF894,1000_QL80_.jpg","caja con capacidad infinita"),
            new Producto(null, "FER-008", "Destornillador de Precisión", "Stanley", 5990.0, 50, "Herramientas Manuales",
                    "https://bianchi.com.uy/images/thumbs/0000514_juego-de-6-destornilladores-de-precision-66-052-stanley_625.jpeg","destornillador simple con 1 millon de opciones"),
            new Producto(null, "FER-009", "Guantes de Seguridad", "3M", 4990.0, 40, "Seguridad",
                    "https://www.adeepi.com/upload/Documentacion/Publica/FOTOS/GUANTES/SINTETICOS/GACHN-400.jpg","guantes anti todo y proporciona fuerza descomunal a su usuario +1000 de aura"),
            new Producto(null, "FER-010", "Pintura Esmalte Negro", "Ceresita", 18990.0, 18, "Pinturas y Acabados",
                    "https://http2.mlstatic.com/D_NQ_NP_847908-MLC74174700700_012024-O-esmalte-sintetico-ceresita-aquatech-galon-colores-outlet.webp","esmalte anticorrosivo duracion 1000 años")
        );

        productoRepository.saveAll(productos);
        System.out.println("📦 Productos con imágenes cargados correctamente.");
    }
}

package com.ferremas.ecommerce.model;

import jakarta.persistence.*;

@Entity
public class OrdenItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombreProducto;
    private Double precio;

    @ManyToOne
    private Orden orden;

    public Long getId() {
    return id;
}

public String getNombreProducto() {
    return nombreProducto;
}

public void setNombreProducto(String nombreProducto) {
    this.nombreProducto = nombreProducto;
}

public Double getPrecio() {
    return precio;
}

public void setPrecio(Double precio) {
    this.precio = precio;
}

public Orden getOrden() {
    return orden;
}

public void setOrden(Orden orden) {
    this.orden = orden;
}

}

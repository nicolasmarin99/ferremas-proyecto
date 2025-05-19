package com.ferremas.ecommerce.dto;

import java.time.LocalDateTime;

public class OrdenDTO {
    private Long id;
    private String estado;
    private LocalDateTime fecha;
    private double total;
    private String usuario;

    public OrdenDTO(Long id, String estado, LocalDateTime fecha, double total, String usuario) {
        this.id = id;
        this.estado = estado;
        this.fecha = fecha;
        this.total = total;
        this.usuario = usuario;
    }

    // Getters
    public Long getId() { return id; }
    public String getEstado() { return estado; }
    public LocalDateTime getFecha() { return fecha; }
    public double getTotal() { return total; }
    public String getUsuario() { return usuario; }
}

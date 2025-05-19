package com.ferremas.ecommerce.controller;

import com.ferremas.ecommerce.dto.OrdenDTO;
import com.ferremas.ecommerce.model.Orden;
import com.ferremas.ecommerce.repository.OrdenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class OrdenController {

    @Autowired
    private OrdenRepository ordenRepository;

    @GetMapping("/ordenes")
    public List<OrdenDTO> obtenerOrdenes() {
        List<Orden> ordenes = ordenRepository.findAll();
        return ordenes.stream()
                .map(o -> new OrdenDTO(
                        o.getId(),
                        o.getEstado(),
                        o.getFecha(),
                        o.getTotal(),
                        o.getUsuario()
                ))
                .collect(Collectors.toList());
    }
}
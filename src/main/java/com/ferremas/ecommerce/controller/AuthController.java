package com.ferremas.ecommerce.controller;

import com.ferremas.ecommerce.model.Usuario;
import com.ferremas.ecommerce.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.ferremas.ecommerce.security.JwtUtils;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@RequestBody Map<String, String> body) {
        String username = body.get("username");
        String password = body.get("password");
        String rol = body.get("rol");

        String resultado = authService.registrarUsuario(username, password, rol);
        return ResponseEntity.ok(Map.of("mensaje", resultado));
    }

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
    String username = body.get("username");
    String password = body.get("password");

    Usuario usuario = authService.login(username, password);
    if (usuario != null) {
        String token = jwtUtils.generateToken(usuario.getUsername(), usuario.getRol());
        return ResponseEntity.ok(Map.of(
            "mensaje", "✅ Login exitoso",
            "token", token
        ));
    } else {
        return ResponseEntity.status(401).body(Map.of("mensaje", "❌ Credenciales inválidas"));
    }
}
}

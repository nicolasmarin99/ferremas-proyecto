package com.ferremas.ecommerce.service;

import com.ferremas.ecommerce.model.Usuario;
import com.ferremas.ecommerce.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String registrarUsuario(String username, String password, String rol) {
        if (usuarioRepository.existsByUsername(username)) {
            return "❌ El usuario ya existe";
        }

        Usuario usuario = new Usuario();
        usuario.setUsername(username);
        usuario.setPassword(passwordEncoder.encode(password));
        usuario.setRol(rol.toUpperCase());

        usuarioRepository.save(usuario);
        return "✅ Usuario registrado exitosamente";
    }

    public Usuario login(String username, String password) {
        Usuario usuario = usuarioRepository.findByUsername(username).orElse(null);
        if (usuario != null && passwordEncoder.matches(password, usuario.getPassword())) {
            return usuario;
        }
        return null;
    }
}

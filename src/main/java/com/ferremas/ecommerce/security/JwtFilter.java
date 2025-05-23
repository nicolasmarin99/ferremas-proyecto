package com.ferremas.ecommerce.security;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        // ✅ Rutas públicas permitidas sin autenticación
        if (
            path.startsWith("/api/auth") ||
            path.startsWith("/api/productos") || 
            path.equals("/api/simular-pago") ||
            path.startsWith("/api/mercadopago")
        ) {
            filterChain.doFilter(request, response);
            return;
        }

        // ✅ Verificación del token JWT
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            if (jwtUtils.isTokenValid(token)) {
                Claims claims = jwtUtils.getClaims(token);
                String username = claims.getSubject();
                String rol = (String) claims.get("rol");

                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
                        username,
                        null,
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + rol.toUpperCase()))
                );

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        // 🚨 Si no hay token o es inválido, simplemente pasa (será denegado más adelante si es necesario)
        filterChain.doFilter(request, response);
    }
}

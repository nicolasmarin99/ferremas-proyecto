    package com.ferremas.ecommerce.controller;

    import com.fasterxml.jackson.databind.ObjectMapper;
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.http.*;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.client.RestTemplate;
    import org.springframework.web.client.HttpClientErrorException;

    import java.util.Map;

    @RestController
    @RequestMapping("/api/mercadopago")
    @CrossOrigin(origins = "http://localhost:3000")
    public class PagoMercadoPagoController {

        @Value("${mercadopago.token}")
        private String mercadoPagoToken;

    @PostMapping("/crear-preferencia")
    public ResponseEntity<?> crearPreferencia(@RequestBody Map<String, Object> request) {
        try {
            System.out.println("📦 Request recibido para MercadoPago:");
            System.out.println(request);

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(mercadoPagoToken);
            headers.setContentType(MediaType.APPLICATION_JSON);

            ObjectMapper mapper = new ObjectMapper();
            String json = mapper.writeValueAsString(request); // <-- Aquí se asegura que se serializa bien
            HttpEntity<String> entity = new HttpEntity<>(json, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    "https://api.mercadopago.com/checkout/preferences",
                    entity,
                    Map.class
            );

            return ResponseEntity.ok(response.getBody());

        } catch (HttpClientErrorException ex) {
            System.out.println("❌ Error HTTP: " + ex.getStatusCode());
            System.out.println("❌ Respuesta: " + ex.getResponseBodyAsString());
            return ResponseEntity.status(ex.getStatusCode()).body(Map.of(
                "mensaje", "❌ Error de MercadoPago",
                "error", ex.getResponseBodyAsString()
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                "mensaje", "❌ Error al crear preferencia",
                "error", e.getMessage()
            ));
        }
    }
    }

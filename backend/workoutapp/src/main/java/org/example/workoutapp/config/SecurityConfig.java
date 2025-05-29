package org.example.workoutapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    // SecurityFilterChain for å disable passordgreier mellom front og backend
    // er laget av chatgpt! thanks Mr. GPT!!
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())                // Disable CSRF
                .cors(cors -> cors.disable())                // Disable CORS
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()                // Allow everything
                )
                .formLogin(AbstractHttpConfigurer::disable)  // Disable login form
                .httpBasic(AbstractHttpConfigurer::disable)  // Disable basic auth
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // No session
                );

        return http.build();
    }
    // DET OVER ER FRA Mr. GPT

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

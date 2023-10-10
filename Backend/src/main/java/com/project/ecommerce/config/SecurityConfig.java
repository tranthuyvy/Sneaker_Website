package com.project.ecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private UserDetailsService userDetailsService;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    @Order(1)
    public SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/api/admin").authorizeHttpRequests(authorize -> authorize
                        .anyRequest().hasRole("ADMIN"))
                .formLogin(withDefaults())
                .httpBasic(withDefaults());
        return http.build();
    }

    @Order(2)
    public SecurityFilterChain apiFilterChain2(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/api/staff")
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().hasAnyRole("STAFF", "ADMIN"))
                .formLogin(withDefaults())
                .httpBasic(withDefaults());
        return http.build();
    }

    @Order(3)
    public SecurityFilterChain apiFilterChain3(HttpSecurity http) throws Exception {
      
        http
                .securityMatcher("/api/customer")
                .authorizeHttpRequests(authorize -> authorize
                        .anyRequest().hasAnyRole("CUSTOMER"))
                .oauth2Login();
    return http.build();
    
    }
    @Order(4)
    @Bean                                                            
	public SecurityFilterChain formLoginFilterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests(authorize -> authorize
				.anyRequest().authenticated()
			)
			.formLogin(withDefaults());
		return http.build();
	}
    
   

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

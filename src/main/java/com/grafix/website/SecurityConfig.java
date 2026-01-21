package com.grafix.website;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .authorizeHttpRequests((requests) -> requests
                                                .requestMatchers("/", "/products", "/reviews/add", "/blog", "/about",
                                                                "/contact", "/css/**",
                                                                "/images/**", "/uploads/**")
                                                .permitAll()
                                                .requestMatchers("/admin/reviews").hasRole("ADMIN")
                                                .requestMatchers("/admin/**").hasAnyRole("ADMIN", "STAFF")
                                                .anyRequest().authenticated())
                                .formLogin((form) -> form
                                                .loginPage("/login")
                                                .defaultSuccessUrl("/admin/dashboard", true)
                                                .permitAll())
                                .logout((logout) -> logout
                                                .logoutUrl("/logout")
                                                .logoutSuccessUrl("/")
                                                .permitAll())
                                .csrf(csrf -> csrf.disable()); // Disabled for ease of demonstration in admin panel

                return http.build();
        }

        @Bean
        public UserDetailsService userDetailsService() {
                UserDetails admin = User.withDefaultPasswordEncoder()
                                .username("admin")
                                .password("admin123")
                                .roles("ADMIN")
                                .build();

                UserDetails staff = User.withDefaultPasswordEncoder()
                                .username("staff")
                                .password("staff123")
                                .roles("STAFF")
                                .build();

                return new InMemoryUserDetailsManager(admin, staff);
        }
}

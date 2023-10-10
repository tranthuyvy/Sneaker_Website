package com.project.ecommerce.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EntityScan("com.project.ecommerce.domain")
@EnableJpaRepositories("com.project.ecommerce.repos")
@EnableTransactionManagement
public class DomainConfig {
}

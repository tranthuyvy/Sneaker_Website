package com.project.ecommerce.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.ecommerce.domain.Account;


public interface AccountRepository extends JpaRepository<Account, Integer> {
}

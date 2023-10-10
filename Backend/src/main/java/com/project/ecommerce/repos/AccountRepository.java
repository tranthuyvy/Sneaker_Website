package com.project.ecommerce.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.ecommerce.domain.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    Account findByName(String userName);
}

package com.project.ecommerce.repos;

import com.project.ecommerce.domain.DiscountUser;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DiscountUserRepository extends JpaRepository<DiscountUser, Integer> {
}

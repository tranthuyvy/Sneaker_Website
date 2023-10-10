package com.project.ecommerce.repos;

import com.project.ecommerce.domain.Discount;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DiscountRepository extends JpaRepository<Discount, Integer> {
}

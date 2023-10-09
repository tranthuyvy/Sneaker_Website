package com.project.repos;

import com.project.domain.Discount;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DiscountRepository extends JpaRepository<Discount, Integer> {
}

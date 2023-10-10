package com.project.ecommerce.repos;

import com.project.ecommerce.domain.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
}

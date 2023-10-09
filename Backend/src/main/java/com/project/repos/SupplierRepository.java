package com.project.repos;

import com.project.domain.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
}

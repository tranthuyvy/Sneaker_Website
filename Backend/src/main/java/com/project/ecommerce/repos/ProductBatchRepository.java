package com.project.ecommerce.repos;

import com.project.ecommerce.domain.ProductBatch;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductBatchRepository extends JpaRepository<ProductBatch, Integer> {
}

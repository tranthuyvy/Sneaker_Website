package com.project.ecommerce.repos;

import com.project.ecommerce.domain.ProductBatchItem;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductBatchItemRepository extends JpaRepository<ProductBatchItem, Integer> {
}

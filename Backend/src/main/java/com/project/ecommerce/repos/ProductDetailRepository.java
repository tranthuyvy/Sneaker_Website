package com.project.ecommerce.repos;

import com.project.ecommerce.domain.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductDetailRepository extends JpaRepository<ProductDetail, Integer> {
}

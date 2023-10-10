package com.project.ecommerce.repos;

import com.project.ecommerce.domain.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {
}

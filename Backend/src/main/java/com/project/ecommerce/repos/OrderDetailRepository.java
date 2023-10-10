package com.project.ecommerce.repos;

import com.project.ecommerce.domain.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
}

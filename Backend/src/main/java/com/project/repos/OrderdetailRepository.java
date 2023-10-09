package com.project.repos;

import com.project.domain.Orderdetail;
import org.springframework.data.jpa.repository.JpaRepository;


public interface OrderdetailRepository extends JpaRepository<Orderdetail, Integer> {
}

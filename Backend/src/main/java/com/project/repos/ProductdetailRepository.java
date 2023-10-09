package com.project.repos;

import com.project.domain.Productdetail;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductdetailRepository extends JpaRepository<Productdetail, Integer> {
}

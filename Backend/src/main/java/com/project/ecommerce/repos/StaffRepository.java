package com.project.ecommerce.repos;

import com.project.ecommerce.domain.Staff;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StaffRepository extends JpaRepository<Staff, Integer> {
}

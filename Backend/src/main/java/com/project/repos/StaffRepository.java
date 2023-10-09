package com.project.repos;

import com.project.domain.Staff;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StaffRepository extends JpaRepository<Staff, Integer> {
}

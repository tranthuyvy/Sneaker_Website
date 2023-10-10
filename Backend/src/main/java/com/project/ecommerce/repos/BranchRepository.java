package com.project.ecommerce.repos;
import com.project.ecommerce.domain.Branch;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BranchRepository extends JpaRepository<Branch, Integer> {
}

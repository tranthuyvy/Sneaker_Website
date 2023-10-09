package com.project.repos;

import com.project.domain.Branch;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BranchRepository extends JpaRepository<Branch, Integer> {
}

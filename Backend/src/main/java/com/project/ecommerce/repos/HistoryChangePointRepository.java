package com.project.ecommerce.repos;

import com.project.ecommerce.domain.HistoryChangePoint;
import org.springframework.data.jpa.repository.JpaRepository;


public interface HistoryChangePointRepository extends JpaRepository<HistoryChangePoint, Integer> {
}

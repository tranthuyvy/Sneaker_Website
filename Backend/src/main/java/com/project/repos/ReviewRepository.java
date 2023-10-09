package com.project.repos;

import com.project.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReviewRepository extends JpaRepository<Review, Integer> {
}

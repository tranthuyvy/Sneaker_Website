package com.project.ecommerce.repos;

import com.project.ecommerce.domain.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
}

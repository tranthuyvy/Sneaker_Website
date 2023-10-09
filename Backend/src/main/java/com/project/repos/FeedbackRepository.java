package com.project.repos;

import com.project.domain.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
}

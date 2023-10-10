package com.project.ecommerce.repos;

import com.project.ecommerce.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Integer> {
}

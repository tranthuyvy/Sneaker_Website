package com.project.ecommerce.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.ecommerce.domain.Category;


public interface CategoryRepository extends JpaRepository<Category, Integer> {
}

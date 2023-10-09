package com.project.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.time.OffsetDateTime;
import java.util.Set;


@Entity
public class Category {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer createBy;

    @Column
    private OffsetDateTime createAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id", nullable = false)
    private Category parent;

    @OneToMany(mappedBy = "parent")
    private Set<Category> parentCategories;

    @OneToMany(mappedBy = "category")
    private Set<Product> categoryProducts;

    public Integer getId() {
        return id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public Integer getCreateBy() {
        return createBy;
    }

    public void setCreateBy(final Integer createBy) {
        this.createBy = createBy;
    }

    public OffsetDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(final OffsetDateTime createAt) {
        this.createAt = createAt;
    }

    public Category getParent() {
        return parent;
    }

    public void setParent(final Category parent) {
        this.parent = parent;
    }

    public Set<Category> getParentCategories() {
        return parentCategories;
    }

    public void setParentCategories(final Set<Category> parentCategories) {
        this.parentCategories = parentCategories;
    }

    public Set<Product> getCategoryProducts() {
        return categoryProducts;
    }

    public void setCategoryProducts(final Set<Product> categoryProducts) {
        this.categoryProducts = categoryProducts;
    }

}

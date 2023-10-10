package com.project.ecommerce.domain;

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
public class Product {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer createBy;

    @Column(nullable = false)
    private OffsetDateTime createAt;

    @Column(nullable = false)
    private Integer productPrice;

    @Column(nullable = false, name = "\"description\"")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discount_id", nullable = false)
    private Discount discount;

    @OneToMany(mappedBy = "product")
    private Set<ProductDetail> productProductDetails;

    @OneToMany(mappedBy = "product")
    private Set<Review> productReviews;

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

    public Integer getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(final Integer productPrice) {
        this.productPrice = productPrice;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public Branch getBranch() {
        return branch;
    }

    public void setBranch(final Branch branch) {
        this.branch = branch;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(final Category category) {
        this.category = category;
    }

    public Discount getDiscount() {
        return discount;
    }

    public void setDiscount(final Discount discount) {
        this.discount = discount;
    }

    public Set<ProductDetail> getProductProductDetails() {
        return productProductDetails;
    }

    public void setProductProductDetails(final Set<ProductDetail> productProductDetails) {
        this.productProductDetails = productProductDetails;
    }

    public Set<Review> getProductReviews() {
        return productReviews;
    }

    public void setProductReviews(final Set<Review> productReviews) {
        this.productReviews = productReviews;
    }

}

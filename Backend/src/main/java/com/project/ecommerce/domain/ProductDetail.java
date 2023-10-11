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
import java.util.Set;


@Entity
public class ProductDetail {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private Integer size;

    @OneToMany(mappedBy = "productDetail")
    private Set<OrderDetail> productDetailOrderDetails;

    @OneToMany(mappedBy = "productDetail")
    private Set<ProductBatchItem> productDetailProductBatchItems;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @OneToMany(mappedBy = "productDetail")
    private Set<ProductImage> productDetailProductImages;

    public Integer getId() {
        return id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(final String color) {
        this.color = color;
    }

    public Integer getSize() {
        return size;
    }

    public void setSize(final Integer size) {
        this.size = size;
    }

    public Set<OrderDetail> getProductDetailOrderDetails() {
        return productDetailOrderDetails;
    }

    public void setProductDetailOrderDetails(final Set<OrderDetail> productDetailOrderDetails) {
        this.productDetailOrderDetails = productDetailOrderDetails;
    }

    public Set<ProductBatchItem> getProductDetailProductBatchItems() {
        return productDetailProductBatchItems;
    }

    public void setProductDetailProductBatchItems(
            final Set<ProductBatchItem> productDetailProductBatchItems) {
        this.productDetailProductBatchItems = productDetailProductBatchItems;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(final Product product) {
        this.product = product;
    }

    public Set<ProductImage> getProductDetailProductImages() {
        return productDetailProductImages;
    }

    public void setProductDetailProductImages(final Set<ProductImage> productDetailProductImages) {
        this.productDetailProductImages = productDetailProductImages;
    }

}
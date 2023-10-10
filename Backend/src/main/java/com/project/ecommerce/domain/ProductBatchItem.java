package com.project.ecommerce.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class ProductBatchItem {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Integer importPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_batch_id", nullable = false)
    private ProductBatch productBatch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_detail_id", nullable = false)
    private ProductDetail productDetail;

    public Integer getId() {
        return id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(final Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getImportPrice() {
        return importPrice;
    }

    public void setImportPrice(final Integer importPrice) {
        this.importPrice = importPrice;
    }

    public ProductBatch getProductBatch() {
        return productBatch;
    }

    public void setProductBatch(final ProductBatch productBatch) {
        this.productBatch = productBatch;
    }

    public ProductDetail getProductDetail() {
        return productDetail;
    }

    public void setProductDetail(final ProductDetail productDetail) {
        this.productDetail = productDetail;
    }

}

package com.project.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


@Entity
public class Productbatchitem {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Integer idProductDetail;

    @Column(nullable = false)
    private Integer importPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_batch_id", nullable = false)
    private Productbatch productBatch;

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

    public Integer getIdProductDetail() {
        return idProductDetail;
    }

    public void setIdProductDetail(final Integer idProductDetail) {
        this.idProductDetail = idProductDetail;
    }

    public Integer getImportPrice() {
        return importPrice;
    }

    public void setImportPrice(final Integer importPrice) {
        this.importPrice = importPrice;
    }

    public Productbatch getProductBatch() {
        return productBatch;
    }

    public void setProductBatch(final Productbatch productBatch) {
        this.productBatch = productBatch;
    }

}

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
public class Productbatch {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private OffsetDateTime createAt;

    @Column(nullable = false)
    private Integer createBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id", nullable = false)
    private Supplier supplier;

    @OneToMany(mappedBy = "productBatch")
    private Set<Productbatchitem> productBatchProductbatchitems;

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

    public OffsetDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(final OffsetDateTime createAt) {
        this.createAt = createAt;
    }

    public Integer getCreateBy() {
        return createBy;
    }

    public void setCreateBy(final Integer createBy) {
        this.createBy = createBy;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(final Supplier supplier) {
        this.supplier = supplier;
    }

    public Set<Productbatchitem> getProductBatchProductbatchitems() {
        return productBatchProductbatchitems;
    }

    public void setProductBatchProductbatchitems(
            final Set<Productbatchitem> productBatchProductbatchitems) {
        this.productBatchProductbatchitems = productBatchProductbatchitems;
    }

}

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
import java.util.Set;


@Entity
public class Productdetail {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private Integer size;

    @OneToMany(mappedBy = "productDetail")
    private Set<Orderdetail> productDetailOrderdetails;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @OneToMany(mappedBy = "productDetail")
    private Set<Productimage> productDetailProductimages;

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

    public Set<Orderdetail> getProductDetailOrderdetails() {
        return productDetailOrderdetails;
    }

    public void setProductDetailOrderdetails(final Set<Orderdetail> productDetailOrderdetails) {
        this.productDetailOrderdetails = productDetailOrderdetails;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(final Product product) {
        this.product = product;
    }

    public Set<Productimage> getProductDetailProductimages() {
        return productDetailProductimages;
    }

    public void setProductDetailProductimages(final Set<Productimage> productDetailProductimages) {
        this.productDetailProductimages = productDetailProductimages;
    }

}

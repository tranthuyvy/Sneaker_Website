package com.project.ecommerce.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.Set;

@Entity
public class Branch {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String info;

    @Column(nullable = false)
    private String linkPage;

    @OneToMany(mappedBy = "branch")
    private Set<Product> branchProducts;

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

    public String getInfo() {
        return info;
    }

    public void setInfo(final String info) {
        this.info = info;
    }

    public String getLinkPage() {
        return linkPage;
    }

    public void setLinkPage(final String linkPage) {
        this.linkPage = linkPage;
    }

    public Set<Product> getBranchProducts() {
        return branchProducts;
    }

    public void setBranchProducts(final Set<Product> branchProducts) {
        this.branchProducts = branchProducts;
    }

    public Branch(int branchId) {
        this.id = branchId;
    }
}

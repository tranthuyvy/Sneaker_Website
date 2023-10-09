package com.project.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.Set;


@Entity
public class Supplier {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String name;

    @Column
    private String address;

    @Column(length = 10)
    private String phone;

    @OneToMany(mappedBy = "supplier")
    private Set<Productbatch> supplierProductbatches;

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

    public String getAddress() {
        return address;
    }

    public void setAddress(final String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(final String phone) {
        this.phone = phone;
    }

    public Set<Productbatch> getSupplierProductbatches() {
        return supplierProductbatches;
    }

    public void setSupplierProductbatches(final Set<Productbatch> supplierProductbatches) {
        this.supplierProductbatches = supplierProductbatches;
    }

}

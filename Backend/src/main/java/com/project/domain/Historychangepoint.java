package com.project.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.OffsetDateTime;


@Entity
public class Historychangepoint {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private OffsetDateTime createAt;

    @Column(nullable = false)
    private Integer idOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discount_user_id", nullable = false)
    private Discountuser discountUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Integer getId() {
        return id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public OffsetDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(final OffsetDateTime createAt) {
        this.createAt = createAt;
    }

    public Integer getIdOrder() {
        return idOrder;
    }

    public void setIdOrder(final Integer idOrder) {
        this.idOrder = idOrder;
    }

    public Discountuser getDiscountUser() {
        return discountUser;
    }

    public void setDiscountUser(final Discountuser discountUser) {
        this.discountUser = discountUser;
    }

    public User getUser() {
        return user;
    }

    public void setUser(final User user) {
        this.user = user;
    }

}

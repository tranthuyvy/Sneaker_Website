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
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.Set;


@Entity
@Table(name = "\"order\"")
public class Order {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private Integer totalPrice;

    @Column(nullable = false)
    private Integer totalItem;
    @Column(nullable = false)
    private String pay_method;
    @Column(nullable = false)
    private Integer totalDiscountedPrice;

    @Column(nullable = false)
    private Integer statusPayment;

    @Column(nullable = false)
    private Integer statusOrder;

    @Column(nullable = false)
    private OffsetDateTime createAt;

    @Column(nullable = false)
    private Integer updateBy;

    @Column(nullable = false)
    private OffsetDateTime updateAt;

    @Column(nullable = false)
    private LocalDate deliveryDate;

    @OneToMany(mappedBy = "order")
    private Set<Feedback> orderFeedbacks;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order")
    private Set<Orderdetail> orderOrderdetails;

    public Integer getId() {
        return id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public Integer getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(final Integer totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Integer getTotalItem() {
        return totalItem;
    }

    public void setTotalItem(final Integer totalItem) {
        this.totalItem = totalItem;
    }

    public Integer getTotalDiscountedPrice() {
        return totalDiscountedPrice;
    }

    public void setTotalDiscountedPrice(final Integer totalDiscountedPrice) {
        this.totalDiscountedPrice = totalDiscountedPrice;
    }

    public Integer getStatusPayment() {
        return statusPayment;
    }

    public void setStatusPayment(final Integer statusPayment) {
        this.statusPayment = statusPayment;
    }

    public Integer getStatusOrder() {
        return statusOrder;
    }

    public void setStatusOrder(final Integer statusOrder) {
        this.statusOrder = statusOrder;
    }

    public OffsetDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(final OffsetDateTime createAt) {
        this.createAt = createAt;
    }

    public Integer getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(final Integer updateBy) {
        this.updateBy = updateBy;
    }
    public String getPayMethod() {
        return pay_method;
    }

    public void setPaymethod(final String payMethod) {
        this.pay_method = payMethod;
    }
    public OffsetDateTime getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(final OffsetDateTime updateAt) {
        this.updateAt = updateAt;
    }

    public LocalDate getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(final LocalDate deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public Set<Feedback> getOrderFeedbacks() {
        return orderFeedbacks;
    }

    public void setOrderFeedbacks(final Set<Feedback> orderFeedbacks) {
        this.orderFeedbacks = orderFeedbacks;
    }

    public User getUser() {
        return user;
    }

    public void setUser(final User user) {
        this.user = user;
    }

    public Set<Orderdetail> getOrderOrderdetails() {
        return orderOrderdetails;
    }

    public void setOrderOrderdetails(final Set<Orderdetail> orderOrderdetails) {
        this.orderOrderdetails = orderOrderdetails;
    }

}

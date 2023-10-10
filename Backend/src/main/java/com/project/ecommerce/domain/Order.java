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
    private Integer totalDiscountedPrice;

    @Column(nullable = false)
    private Integer statusPayment;

    @Column(nullable = false)
    private String payMethod;

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

    @OneToMany(mappedBy = "order")
    private Set<HistoryChangePoint> orderHistoryChangePoints;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order")
    private Set<OrderDetail> orderOrderDetails;

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
    public String getPayMethod() {
        return payMethod;
    }

    public void setPayMethod(final String payMethod) {
        this.payMethod = payMethod;
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

    public Set<HistoryChangePoint> getOrderHistoryChangePoints() {
        return orderHistoryChangePoints;
    }

    public void setOrderHistoryChangePoints(
            final Set<HistoryChangePoint> orderHistoryChangePoints) {
        this.orderHistoryChangePoints = orderHistoryChangePoints;
    }

    public User getUser() {
        return user;
    }

    public void setUser(final User user) {
        this.user = user;
    }

    public Set<OrderDetail> getOrderOrderDetails() {
        return orderOrderDetails;
    }

    public void setOrderOrderDetails(final Set<OrderDetail> orderOrderDetails) {
        this.orderOrderDetails = orderOrderDetails;
    }

}

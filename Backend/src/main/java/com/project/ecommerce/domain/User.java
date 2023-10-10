package com.project.ecommerce.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.Set;


@Entity
public class User {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 10)
    private String phone;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String platform;

    @Column(nullable = false, length = 50)
    private String idSocial;

    @Column(nullable = false)
    private Integer point;

    @OneToMany(mappedBy = "user")
    private Set<HistoryChangePoint> userHistoryChangePoints;

    @OneToMany(mappedBy = "user")
    private Set<Order> userOrders;

    @OneToMany(mappedBy = "user")
    private Set<Review> userReviews;

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

    public String getPhone() {
        return phone;
    }

    public void setPhone(final String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(final String email) {
        this.email = email;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(final String platform) {
        this.platform = platform;
    }

    public String getIdSocial() {
        return idSocial;
    }

    public void setIdSocial(final String idSocial) {
        this.idSocial = idSocial;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(final Integer point) {
        this.point = point;
    }

    public Set<HistoryChangePoint> getUserHistoryChangePoints() {
        return userHistoryChangePoints;
    }

    public void setUserHistoryChangePoints(final Set<HistoryChangePoint> userHistoryChangePoints) {
        this.userHistoryChangePoints = userHistoryChangePoints;
    }

    public Set<Order> getUserOrders() {
        return userOrders;
    }

    public void setUserOrders(final Set<Order> userOrders) {
        this.userOrders = userOrders;
    }

    public Set<Review> getUserReviews() {
        return userReviews;
    }

    public void setUserReviews(final Set<Review> userReviews) {
        this.userReviews = userReviews;
    }

}

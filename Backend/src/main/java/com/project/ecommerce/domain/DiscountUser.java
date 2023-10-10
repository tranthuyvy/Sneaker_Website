package com.project.ecommerce.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.time.OffsetDateTime;
import java.util.Set;


@Entity
public class DiscountUser {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer point;

    @Column(nullable = false)
    private Integer value;

    @Column(nullable = false, name = "\"description\"")
    private String description;

    @Column(nullable = false)
    private OffsetDateTime createAt;

    @Column(nullable = false)
    private Integer createBy;

    @OneToMany(mappedBy = "discountUser")
    private Set<HistoryChangePoint> discountUserHistoryChangePoints;

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

    public Integer getPoint() {
        return point;
    }

    public void setPoint(final Integer point) {
        this.point = point;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(final Integer value) {
        this.value = value;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
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

    public Set<HistoryChangePoint> getDiscountUserHistoryChangePoints() {
        return discountUserHistoryChangePoints;
    }

    public void setDiscountUserHistoryChangePoints(
            final Set<HistoryChangePoint> discountUserHistoryChangePoints) {
        this.discountUserHistoryChangePoints = discountUserHistoryChangePoints;
    }

}

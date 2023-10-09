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
import java.time.LocalDate;
import java.util.Set;


@Entity
public class Staff {

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
    private Integer idCard;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Column
    private String sex;

    @Column(nullable = false, length = 15)
    private String bankAccountNumber;

    @OneToMany(mappedBy = "createBy")
    private Set<Discount> createByDiscounts;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

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

    public Integer getIdCard() {
        return idCard;
    }

    public void setIdCard(final Integer idCard) {
        this.idCard = idCard;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(final LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(final String sex) {
        this.sex = sex;
    }

    public String getBankAccountNumber() {
        return bankAccountNumber;
    }

    public void setBankAccountNumber(final String bankAccountNumber) {
        this.bankAccountNumber = bankAccountNumber;
    }

    public Set<Discount> getCreateByDiscounts() {
        return createByDiscounts;
    }

    public void setCreateByDiscounts(final Set<Discount> createByDiscounts) {
        this.createByDiscounts = createByDiscounts;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(final Account account) {
        this.account = account;
    }

}

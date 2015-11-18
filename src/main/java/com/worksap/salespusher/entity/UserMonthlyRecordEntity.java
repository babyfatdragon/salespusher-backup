package com.worksap.salespusher.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="user_monthly_records")
public class UserMonthlyRecordEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	@Column(name="user_id")
	private long userId;
    @Temporal(TemporalType.TIMESTAMP)
    private Date yearmonth;
    @Column(name="sales_target")
	private Integer salesTarget;
    @Column(name="claimable_expenses")
	private Integer claimableExpenses;
    private String comment;
    
    protected UserMonthlyRecordEntity() {}

	public UserMonthlyRecordEntity(long userId, Date yearmonth, Integer salesTarget, Integer claimableExpenses,
			String comment) {
		super();
		this.userId = userId;
		this.yearmonth = yearmonth;
		this.salesTarget = salesTarget;
		this.claimableExpenses = claimableExpenses;
		this.comment = comment;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public Date getYearmonth() {
		return yearmonth;
	}

	public void setYearmonth(Date yearmonth) {
		this.yearmonth = yearmonth;
	}

	public Integer getSalesTarget() {
		return salesTarget;
	}

	public void setSalesTarget(Integer salesTarget) {
		this.salesTarget = salesTarget;
	}

	public Integer getClaimableExpenses() {
		return claimableExpenses;
	}

	public void setClaimableExpenses(Integer claimableExpenses) {
		this.claimableExpenses = claimableExpenses;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
}

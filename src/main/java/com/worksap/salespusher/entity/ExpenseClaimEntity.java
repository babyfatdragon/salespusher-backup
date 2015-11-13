package com.worksap.salespusher.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="expense_claims")
public class ExpenseClaimEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	@Column(name="deal_id")
	private long dealId;
	@Column(name="user_id")
	private long userId;
	private String title;
	@Column(name="date_incurred")
	private Date dateIncurred;
	private Integer amount;

	protected ExpenseClaimEntity() {}

	public ExpenseClaimEntity(long dealId, long userId, String title, Date dateIncurred, Integer amount) {
		super();
		this.dealId = dealId;
		this.userId = userId;
		this.title = title;
		this.dateIncurred = dateIncurred;
		this.amount = amount;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getDealId() {
		return dealId;
	}

	public void setDealId(long dealId) {
		this.dealId = dealId;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public Date getDateIncurred() {
		return dateIncurred;
	}

	public void setDateIncurred(Date dateIncurred) {
		this.dateIncurred = dateIncurred;
	}

	public Integer getAmount() {
		return amount;
	}

	public void setAmount(Integer amount) {
		this.amount = amount;
	}
}
	
	
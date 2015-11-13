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
@Table(name="deal_followers")
public class DealFollowerEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	@Column(name="deal_id")
	private long dealId;
	@Column(name="user_id")
	private long userId;
	@Column(name="unread_comments")
	private int unreadComments;
	@Column(name="unread_events")
	private int unreadEvents;
	@Column(name="unread_files")
	private int unreadFiles;
	@Column(name="unread_expense_claims")
	private int unreadExpenseClaims;
	@Column(name="is_owner")
	private int isOwner;
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name="date_created", insertable = false, updatable = false)
	private Date dateCreated;
	
	protected DealFollowerEntity() {}

	public DealFollowerEntity(long dealId, long userId, int unreadComments, int unreadEvents, int unreadFiles,
			int unreadExpenseClaims, int isOwner) {
		super();
		this.dealId = dealId;
		this.userId = userId;
		this.unreadComments = unreadComments;
		this.unreadEvents = unreadEvents;
		this.unreadFiles = unreadFiles;
		this.unreadExpenseClaims = unreadExpenseClaims;
		this.isOwner = isOwner;
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

	public int getUnreadComments() {
		return unreadComments;
	}

	public void setUnreadComments(int unreadComments) {
		this.unreadComments = unreadComments;
	}

	public int getUnreadEvents() {
		return unreadEvents;
	}

	public void setUnreadEvents(int unreadEvents) {
		this.unreadEvents = unreadEvents;
	}

	public int getUnreadFiles() {
		return unreadFiles;
	}

	public void setUnreadFiles(int unreadFiles) {
		this.unreadFiles = unreadFiles;
	}

	public int getUnreadExpenseClaims() {
		return unreadExpenseClaims;
	}

	public void setUnreadExpenseClaims(int unreadExpenseClaims) {
		this.unreadExpenseClaims = unreadExpenseClaims;
	}

	public int getIsOwner() {
		return isOwner;
	}

	public void setIsOwner(int isOwner) {
		this.isOwner = isOwner;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}
}

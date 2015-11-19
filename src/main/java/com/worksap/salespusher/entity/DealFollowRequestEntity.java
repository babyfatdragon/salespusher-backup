package com.worksap.salespusher.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="deal_follow_requests")
public class DealFollowRequestEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	@Column(name="deal_id")
	private long dealId;
	@Column(name="user_id")
	private long userId;
	@Column(name="invitee_id")
	private long inviteeId;
	@Column(name="is_responded")
	private int isResponded;
	
	protected DealFollowRequestEntity() {}

	public DealFollowRequestEntity(long dealId, long userId, long inviteeId, int isResponded) {
		super();
		this.dealId = dealId;
		this.userId = userId;
		this.inviteeId = inviteeId;
		this.isResponded = isResponded;
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

	public long getInviteeId() {
		return inviteeId;
	}

	public void setInviteeId(long inviteeId) {
		this.inviteeId = inviteeId;
	}

	public int getIsResponded() {
		return isResponded;
	}

	public void setIsResponded(int isResponded) {
		this.isResponded = isResponded;
	}
}

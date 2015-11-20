package com.worksap.salespusher.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="deal_requests")
public class DealRequestEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	@Column(name="deal_id")
	private long dealId;
	@Column(name="user_id")
	private long userId;
	@Column(name="requestee_id")
	private long requesteeId;
	@Column(name="request_message")
	private String requestMessage;
	@Column(name="response_message")
	private String responseMessage;
	@Column(name="request_type")
	private String requestType;
	@Column(name="is_complete")
	private int isComplete;
	
	protected DealRequestEntity() {}

	public DealRequestEntity(long dealId, long userId, long requesteeId, String requestMessage, String responseMessage,
			String requestType, int isComplete) {
		super();
		this.dealId = dealId;
		this.userId = userId;
		this.requesteeId = requesteeId;
		this.requestMessage = requestMessage;
		this.responseMessage = responseMessage;
		this.requestType = requestType;
		this.isComplete = isComplete;
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

	public long getRequesteeId() {
		return requesteeId;
	}

	public void setRequesteeId(long requesteeId) {
		this.requesteeId = requesteeId;
	}

	public String getRequestMessage() {
		return requestMessage;
	}

	public void setRequestMessage(String requestMessage) {
		this.requestMessage = requestMessage;
	}

	public String getResponseMessage() {
		return responseMessage;
	}

	public void setResponseMessage(String responseMessage) {
		this.responseMessage = responseMessage;
	}

	public String getRequestType() {
		return requestType;
	}

	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}

	public int getIsComplete() {
		return isComplete;
	}

	public void setIsComplete(int isComplete) {
		this.isComplete = isComplete;
	}
}

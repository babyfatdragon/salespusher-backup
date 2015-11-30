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
@Table(name="lead_contacts")
public class LeadContactEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
    @Column(name="lead_id")
    private long leadId;
    @Column(name="user_id")
    private long userId;
    private String comment;
    @Column(name="contact_type")
    private String contactType;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="date_created", insertable = false, updatable = false)
	private Date dateCreated;
	
	protected LeadContactEntity() {}

	public LeadContactEntity(long leadId, long userId, String comment, String contactType, Date dateCreated) {
		super();
		this.leadId = leadId;
		this.userId = userId;
		this.comment = comment;
		this.contactType = contactType;
		this.dateCreated = dateCreated;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getLeadId() {
		return leadId;
	}

	public void setLeadId(long leadId) {
		this.leadId = leadId;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getContactType() {
		return contactType;
	}

	public void setContactType(String contactType) {
		this.contactType = contactType;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}
}

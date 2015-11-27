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
@Table(name="leads")
public class LeadEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private String name;
	@Column(name="company_name")
	private String companyName;
	private String interests;
	private String telephone;
	private String email;
    @Column(name="lead_status")
    private String leadStatus;
    @Column(name="user_id")
    private long userId;
    @Column(name="customer_id")
    private long customerId;
    @Column(name="company_id")
    private long companyId;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="date_created", insertable = false, updatable = false)
	private Date dateCreated;
	protected LeadEntity() {}
	public LeadEntity(String name, String companyName, String interests, String telephone, String email,
			String leadStatus, long userId, long customerId, long companyId, Date dateCreated) {
		super();
		this.name = name;
		this.companyName = companyName;
		this.interests = interests;
		this.telephone = telephone;
		this.email = email;
		this.leadStatus = leadStatus;
		this.userId = userId;
		this.customerId = customerId;
		this.companyId = companyId;
		this.dateCreated = dateCreated;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getInterests() {
		return interests;
	}
	public void setInterests(String interests) {
		this.interests = interests;
	}
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getLeadStatus() {
		return leadStatus;
	}
	public void setLeadStatus(String leadStatus) {
		this.leadStatus = leadStatus;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public long getCustomerId() {
		return customerId;
	}
	public void setCustomerId(long customerId) {
		this.customerId = customerId;
	}
	public long getCompanyId() {
		return companyId;
	}
	public void setCompanyId(long companyId) {
		this.companyId = companyId;
	}
	public Date getDateCreated() {
		return dateCreated;
	}
	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}
}

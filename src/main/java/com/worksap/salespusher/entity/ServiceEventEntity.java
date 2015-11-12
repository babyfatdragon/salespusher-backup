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
@Table(name="service_events")
public class ServiceEventEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	@Column(name="deal_id")
	private long dealId;
	@Column(name="user_id")
	private long userId;
	private String title;
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name="start_dt")
	private Date start;
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name="end_dt")
    private Date end;
    private String location;
    private Integer charge;
    
    protected ServiceEventEntity() {}

	public ServiceEventEntity(long dealId, long userId, String title, Date start, Date end, String location,
			Integer charge) {
		super();
		this.dealId = dealId;
		this.userId = userId;
		this.title = title;
		this.start = start;
		this.end = end;
		this.location = location;
		this.charge = charge;
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

	public Date getStart() {
		return start;
	}

	public void setStart(Date start) {
		this.start = start;
	}

	public Date getEnd() {
		return end;
	}

	public void setEnd(Date end) {
		this.end = end;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Integer getCharge() {
		return charge;
	}

	public void setCharge(Integer charge) {
		this.charge = charge;
	}
}

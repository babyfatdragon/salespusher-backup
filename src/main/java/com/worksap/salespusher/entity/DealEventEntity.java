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
@Table(name="deal_events")
public class DealEventEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	@Column(name="deal_id")
	private long dealId;
	private String title;
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name="start_dt")
	private Date start;
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name="end_dt")
    private Date end;
    private String location;
	
	protected DealEventEntity() {}

	public DealEventEntity(long dealId, String title, Date start, Date end, String location) {
		super();
		this.dealId = dealId;
		this.title = title;
		this.start = start;
		this.end = end;
		this.location = location;
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
}

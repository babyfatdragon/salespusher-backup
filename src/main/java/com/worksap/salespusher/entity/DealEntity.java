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
@Table(name="deals")
public class DealEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@Column(name="product_id")
	private Long productId;
	private Integer quantity;
	@Column(name="total_price")
	private Integer totalPrice;
	@Column(name="customer_id")
	private Long customerId;
	@Column(name="company_id")
	private Long companyId;
	@Column(name="user_id")
	private Long userId;
	@Column(name="deal_status")
	private String dealStatus;
	@Column(name="is_parent")
	private Integer isParent;
	@Column(name="parent_id")
	private Long parentId;
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name="date_created", insertable = false, updatable = false)
	private Date dateCreated;
    @Temporal(TemporalType.TIMESTAMP)
	@Column(name="date_closed")
	private Date dateClosed;
	
	protected DealEntity() {}

	public DealEntity(Long productId, Integer quantity, Integer totalPrice, Long customerId, Long companyId,
			Long userId, String dealStatus, Integer isParent, Long parentId, Date dateCreated, Date dateClosed) {
		super();
		this.productId = productId;
		this.quantity = quantity;
		this.totalPrice = totalPrice;
		this.customerId = customerId;
		this.companyId = companyId;
		this.userId = userId;
		this.dealStatus = dealStatus;
		this.isParent = isParent;
		this.parentId = parentId;
		this.dateCreated = dateCreated;
		this.dateClosed = dateClosed;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Integer getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Integer totalPrice) {
		this.totalPrice = totalPrice;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getDealStatus() {
		return dealStatus;
	}

	public void setDealStatus(String dealStatus) {
		this.dealStatus = dealStatus;
	}

	public Integer getIsParent() {
		return isParent;
	}

	public void setIsParent(Integer isParent) {
		this.isParent = isParent;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	public Date getDateClosed() {
		return dateClosed;
	}

	public void setDateClosed(Date dateClosed) {
		this.dateClosed = dateClosed;
	}
}

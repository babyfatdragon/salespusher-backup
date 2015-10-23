package com.worksap.salespusher.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="categorytwo")
public class CategoryTwoEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	private String name;
	@Column(name="categoryone_id")
	private long categoryOneId;
	
	protected CategoryTwoEntity() {}
	
	public CategoryTwoEntity(String name, long categoryOneId) {
		this.name = name;
		this.categoryOneId = categoryOneId;
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

	public long getCategoryOneId() {
		return categoryOneId;
	}

	public void setCategoryOneId(long categoryOneId) {
		this.categoryOneId = categoryOneId;
	}	
}

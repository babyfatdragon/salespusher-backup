package com.worksap.salespusher.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="products")
public class ProductEntity {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	@Column(name="product_name")
	private String name;
	@Column(name="first_category")
//	private int firstCategory;
	private int categoryOneId;
	@Column(name="second_category")
//	private int secondCategory;
	private int categoryTwoId;
	private String overview;
	private String technology;
	private String specification;
	private int price;
	
	protected ProductEntity() {}

	public ProductEntity(long id, String name, int categoryOneId, int categoryTwoId, String overview, String technology,
			String specification, int price) {
		super();
		this.id = id;
		this.name = name;
		this.categoryOneId = categoryOneId;
		this.categoryTwoId = categoryTwoId;
		this.overview = overview;
		this.technology = technology;
		this.specification = specification;
		this.price = price;
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

	public int getCategoryOneId() {
		return categoryOneId;
	}

	public void setCategoryOneId(int categoryOneId) {
		this.categoryOneId = categoryOneId;
	}

	public int getCategoryTwoId() {
		return categoryTwoId;
	}

	public void setCategoryTwoId(int categoryTwoId) {
		this.categoryTwoId = categoryTwoId;
	}

	public String getOverview() {
		return overview;
	}

	public void setOverview(String overview) {
		this.overview = overview;
	}

	public String getTechnology() {
		return technology;
	}

	public void setTechnology(String technology) {
		this.technology = technology;
	}

	public String getSpecification() {
		return specification;
	}

	public void setSpecification(String specification) {
		this.specification = specification;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
	
	/*public ProductEntity(String name,int firstCategory,int secondCategory, String overview, String technology, String specification, int price){
		this.name = name;
		this.firstCategory = firstCategory;
		this.secondCategory = secondCategory;
		this.overview = overview;
		this.technology = technology;
		this.specification = specification;
		this.price = price;
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

	public int getFirstCategory() {
		return firstCategory;
	}

	public void setFirstCategory(int firstCategory) {
		this.firstCategory = firstCategory;
	}

	public int getSecondCategory() {
		return secondCategory;
	}

	public void setSecondCategory(int secondCategory) {
		this.secondCategory = secondCategory;
	}

	public String getOverview() {
		return overview;
	}

	public void setOverview(String overview) {
		this.overview = overview;
	}

	public String getTechnology() {
		return technology;
	}

	public void setTechnology(String technology) {
		this.technology = technology;
	}

	public String getSpecification() {
		return specification;
	}

	public void setSpecification(String specification) {
		this.specification = specification;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}*/
	
	
}

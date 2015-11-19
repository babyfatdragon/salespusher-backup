CREATE TABLE IF NOT EXISTS USERS (
  id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telephone VARCHAR(255) NOT NULL,
  office_id TINYINT DEFAULT '0',
  role VARCHAR(25) NOT NULL,
  PRIMARY KEY (id)
);
TRUNCATE USERS;
INSERT INTO USERS (username, password, firstname, lastname, email,telephone, office_id,role)
  VALUES ('admin1', 'e00cf25ad42683b3df678c61f42c6bda', 'Albert', 'Smith', 'alberts@worksap.co.jp', '89234472', 0, 'ADMIN'),
         ('admin2', 'c84258e9c39059a89ab77d846ddab909', 'Betty', 'Johnson', 'bettyj@worksap.co.jp', '79761432', 0, 'ADMIN'),
      	 ('user1', '24c9e15e52afc47c225b757e7bee1f9d', 'Charles', 'Brown', 'charlesb@worksap.co.jp', '83171310', 0, 'USER'),
      	 ('user2', '7e58d63b60197ceb55a1c487989a3720', 'Dave', 'Miller', 'dave@worksap.co.jp', '92234154', 0, 'USER'),
      	 ('user3', '92877af70a45fd6a2ed7fe81e1236b78', 'Edward', 'Taylor', 'edtaylor@worksap.co.jp', '75437108', 0, 'USER'),
      	 ('user4', '3f02ebe3d7929b091e3d8ccfde2f3bc6', 'Fred', 'Thompson', 'fred@worksap.co.jp', '84298022', 0, 'USER'),
      	 ('user5', '0a791842f52a0acfbb3a783378c066b8', 'Gary', 'White', 'gary@worksap.co.jp', '73317434', 0, 'USER'),
      	 ('user6', 'affec3b64cf90492377a8114c86fc093', 'Helen', 'Martin', 'helenm@worksap.co.jp', '73317434', 0, 'USER');
         
CREATE TABLE IF NOT EXISTS OFFICES (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name varchar(255),
  PRIMARY KEY (id)
);
TRUNCATE OFFICES;
INSERT INTO OFFICES (name) VALUES ('Tokyo'), ('Shanghai'), ('Singapore'), ('Osaka');

CREATE TABLE IF NOT EXISTS PRODUCTS (
	id INT(11) NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(255) NOT NULL,
	first_category TINYINT NOT NULL,
	second_category TINYINT NOT NULL,
	overview MEDIUMTEXT,
	benefits MEDIUMTEXT,
	cases MEDIUMTEXT,
	technology MEDIUMTEXT,
	specification MEDIUMTEXT,
	price INT(11),
	PRIMARY KEY (id)
);
TRUNCATE PRODUCTS;

CREATE TABLE IF NOT EXISTS PRODUCT_IMAGES (
	id INT(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	product_id INT(11) NOT NULL,
	PRIMARY KEY (id)
);
TRUNCATE PRODUCT_IMAGES;

CREATE TABLE IF NOT EXISTS PRODUCT_DOCUMENTS (
	id INT(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	product_id INT(11) NOT NULL,
	PRIMARY KEY (id)
);

TRUNCATE PRODUCT_DOCUMENTS;

CREATE TABLE IF NOT EXISTS PRODUCT_VIDEOS (
	id INT(11) NOT NULL AUTO_INCREMENT,
    url VARCHAR(255) NOT NULL,
    product_id INT(11) NOT NULL,
    PRIMARY KEY (id)
);

TRUNCATE PRODUCT_VIDEOS;

CREATE TABLE IF NOT EXISTS CATEGORYONE (
	id INT(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);
TRUNCATE CATEGORYONE;
INSERT INTO CATEGORYONE (name) VALUES ('Accessories and Supplies'),('Bone Health'),('Magnetic Resonance Imaging'),('PET/CT'),('Radiography'),('Ultrasound');


CREATE TABLE IF NOT EXISTS CATEGORYTWO (
	id INT(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	categoryone_id INT(11) NOT NULL,
	PRIMARY KEY (id)
);
TRUNCATE CATEGORYTWO;
INSERT INTO CATEGORYTWO (name,categoryone_id) VALUES 
('Ultrasound Accessories & Supplies',1), ('MR Accessories & Supplies',1), ('CT & PET/CT Accessories & Supplies',1),('X-ray Accessories & Supplies',1),
('DXA for Bone Health',2),
('MR Systems',3),
('PET/CT Scanners',4),('PET/CT Applications',4),
('Fixed RAD Systems',5),('Mobile X-Ray Systems',5),
('Ultrasound Products',6);

CREATE TABLE IF NOT EXISTS COMPANIES (
	id INT(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	telephone VARCHAR(255),
	email VARCHAR(255),
	address VARCHAR(255),
	date_created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	date_modified DATETIME ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);
TRUNCATE COMPANIES;
INSERT INTO COMPANIES (name,telephone,email,address) VALUES
('Alexandra Hospital','63793150','enquiry@alexhosp.com.sg','378 Alexandra Road Singapore 159964'),
('Changi General Hospital','67888833','feedback@cgh.com.sg','2 Simei Street 3 Singapore 529889'),
('National University Hospital','67795555','NUH_Enquiries@nuhs.edu.sg','5 Lower Kent Ridge Rd Singapore 119074'),
('Singapore General Hospital','62223322','sghenquiry@sgh.com.sg','Outram Rd Singapore 169608');

CREATE TABLE IF NOT EXISTS CUSTOMERS (
	id INT(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	gender VARCHAR(255) NOT NULL,
	company_id INT(11) NOT NULL,
	department VARCHAR(255),
	position VARCHAR(255),
	telephone VARCHAR(255),
	email VARCHAR(255),
	address VARCHAR(255),
	date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
	date_modified DATETIME ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (id)
);
TRUNCATE CUSTOMERS;
INSERT INTO CUSTOMERS (name,gender,company_id,department,position,telephone,email,address) VALUES
('Zack Li','Male',1,'Bone Department','Head','65931752','zack@alexhosp.com.sg','378 Alexandra Road Singapore 159964'),
('Doris Wu','Female',2,'General Surgery','Physician','90712493','dorisw@cgh.com.sg','2 Simei Street 3 Singapore 529889'),
('Tony Davis','Male',3,'Emergency','Head','84021939','tonyd@nuhs.edu.sg','5 Lower Kent Ridge Rd Singapore 119074'),
('May Wong','Female',4,'Diagnostic imaging','Vice Head','97524138','maywong@sgh.com.sg','Outram Rd Singapore 169608');

CREATE TABLE IF NOT EXISTS DEALS (
	id INT(11) NOT NULL AUTO_INCREMENT,
	product_id INT(11) NOT NULL,
	quantity INT(11),
	total_price INT(11),
	customer_id INT(11) NOT NULL,
	company_id INT(11) NOT NULL,
	user_id INT(11) NOT NULL,
	deal_status VARCHAR(255) DEFAULT 'IN PROGRESS',
	date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
	date_closed DATETIME,
	PRIMARY KEY (id)
);
TRUNCATE DEALS;

CREATE TABLE IF NOT EXISTS DEAL_COMMENTS (
	id INT(11) NOT NULL AUTO_INCREMENT,
	deal_id INT(11) NOT NULL,
	user_id INT(11) NOT NULL,
	comment TEXT NOT NULL,
	date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
	date_modified DATETIME ON UPDATE CURRENT_TIMESTAMP,	
	PRIMARY KEY (id)	
);
TRUNCATE DEAL_COMMENTS;

CREATE TABLE IF NOT EXISTS DEAL_FOLLOWERS (
	id INT(11) NOT NULL AUTO_INCREMENT,
	deal_id INT(11) NOT NULL,
	user_id INT(11) NOT NULL,
	unread_comments TINYINT NOT NULL DEFAULT 0,
	unread_events TINYINT NOT NULL DEFAULT 0,
	unread_files TINYINT NOT NULL DEFAULT 0,
	unread_expense_claims TINYINT NOT NULL DEFAULT 0,
	is_owner TINYINT NOT NULL DEFAULT 0,
	date_created DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id)	
);
TRUNCATE DEAL_FOLLOWERS;

CREATE TABLE IF NOT EXISTS DEAL_EVENTS (
	id INT(11) NOT NULL AUTO_INCREMENT,
	deal_id INT(11) NOT NULL,
	title VARCHAR(255) NOT NULL,
	start_dt DATETIME NOT NULL,
	end_dt DATETIME NOT NULL,
	location VARCHAR(255),
	PRIMARY KEY (id)
);
TRUNCATE DEAL_EVENTS;

CREATE TABLE IF NOT EXISTS DEAL_DOCUMENTS (
	id INT(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	deal_id INT(11) NOT NULL,
	PRIMARY KEY (id)
);

TRUNCATE DEAL_DOCUMENTS;

CREATE TABLE IF NOT EXISTS SERVICE_EVENTS (
	id INT(11) NOT NULL AUTO_INCREMENT,
	deal_id INT(11) NOT NULL,
	user_id INT(11) NOT NULL,
	title VARCHAR(255) NOT NULL,
	start_dt DATETIME NOT NULL,
	end_dt DATETIME NOT NULL,
	location VARCHAR(255),
	charge INT(11),
	PRIMARY KEY (id)
);
TRUNCATE SERVICE_EVENTS;

CREATE TABLE IF NOT EXISTS SERVICE_DOCUMENTS (
	id INT(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	service_id INT(11) NOT NULL,
	PRIMARY KEY (id)
);

TRUNCATE SERVICE_DOCUMENTS;

CREATE TABLE IF NOT EXISTS EXPENSE_CLAIMS (
	id INT(11) NOT NULL AUTO_INCREMENT,
	deal_id INT(11) NOT NULL,
	user_id INT(11) NOT NULL,
	title VARCHAR(255) NOT NULL,
	date_incurred DATETIME NOT NULL,
	amount INT(11),
	PRIMARY KEY (id)
);

TRUNCATE EXPENSE_CLAIMS;

CREATE TABLE IF NOT EXISTS USER_MONTHLY_RECORDS (
	id INT(11) NOT NULL AUTO_INCREMENT,
	user_id INT(11) NOT NULL,
	yearmonth DATETIME NOT NULL,
	sales_target INT(11),
	claimable_expenses INT(11),
	comment MEDIUMTEXT,
	PRIMARY KEY (id)
);
CREATE UNIQUE INDEX user_yearmonth ON USER_MONTHLY_RECORDS (user_id, yearmonth);

TRUNCATE USER_MONTHLY_RECORDS;

CREATE TABLE IF NOT EXISTS DEAL_FOLLOW_REQUESTS (
	id INT(11) NOT NULL AUTO_INCREMENT,
	deal_id INT(11) NOT NULL,
	user_id INT(11) NOT NULL,
	invitee_id INT(11) NOT NULL,
	is_responded TINYINT DEFAULT '0',
	PRIMARY KEY(id)
);
CREATE UNIQUE INDEX deal_invitee ON DEAL_FOLLOW_REQUESTS (deal_id, invitee_id);

TRUNCATE DEAL_FOLLOW_REQUESTS;

CREATE TABLE IF NOT EXISTS DEAL_REQUESTS (
	id INT(11) NOT NULL AUTO_INCREMENT,
	deal_id INT(11) NOT NULL,
	user_id INT(11) NOT NULL,
	requestee_id INT(11) NOT NULL,
	request_message MEDIUMTEXT,
	response_message MEDIUMTEXT,
	type VARCHAR(255),
	is_complete TINYINT DEFAULT '0',
	PRIMARY KEY(id)
);
TRUNCATE DEAL_REQUESTS;


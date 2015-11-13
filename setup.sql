CREATE TABLE IF NOT EXISTS USERS (
  id INT(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  office_id TINYINT DEFAULT '0',
  role VARCHAR(25) NOT NULL,
  PRIMARY KEY (id)
);
TRUNCATE USERS;
INSERT INTO USERS (username, password, firstname, lastname, email, office_id,role)
  VALUES ('admin1', 'e00cf25ad42683b3df678c61f42c6bda', 'Michael', 'Jordan', 'admin@worksap.co.jp', 0, 'ADMIN'),
         ('user1', '24c9e15e52afc47c225b757e7bee1f9d', 'Tim', 'Duncan', 'user001@worksap.co.jp', 1, 'USER');
         
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
	overview TEXT,
	benefits TEXT,
	cases TEXT,
	technology TEXT,
	specification TEXT,
	price INT(11),
	PRIMARY KEY (id)
);
TRUNCATE PRODUCTS;
INSERT INTO PRODUCTS (product_name,first_category,second_category,overview,benefits,cases,technology,specification,price) VALUES 
('Discovery XR656 Plus',1,1,'Discovery* XR656 Plus lets you enjoy productivity and workflow benefits thanks to FlashPad*, 
a wireless detector that was designed—from the beginning—for advanced digital imaging. 
Our suite of advanced clinical capabilities helps you address complex clinical needs while differentiating your facility from others. ',
'',
'',
'Advance your clinical capabilities
FlashPad Digital radiography detector 
Gain control over your workflow
Service you can count on!',
'',
250000),
('Definium 5000',1,2,
'The Definium 5000 is a compact and versatile digital radiography system. 
It’s well-suited for the demands of high-volume imaging, especially in treatment centers where space is at a premium, 
such as orthopedic and sports medicine facilities, physician offices, satellite offices and stand-alone imaging centers. 
It’s an affordable digital solution in a compact system.',
'',
'',
'Amorphous silicon non-tiled digital detector with cesium iodide scintillator
Patient-side collimator and technique controls with digital display (e.g. mA, kVp, mAs)
Patient-side automated positioning selection
Patient-side selection of pre-programmed U-arm positions
High DQE for excellent image quality and dose efficiency',
'The Definium 5000 digital radiographic imaging system is designed as a compact, 
digital imaging system for use in hospital emergency departments, 
orthopedic centers, and to support most general radiology applications. 
It provides excellent image quality, image manipulation and dose reporting. 
These features help make the system reliable and easy to use while providing high-quality radiographic images in a digital environment.',
225000),
('Discovery PET/CT 610',2,3,
'GE Healthcare is proud to announce that the Discovery* PET/CT 610 has achieved an absolute sensitivity of 10.0 cps/kBq, 
the highest level found on any scanner on the market.1 Sensitivity is one of GE’s critical foundations of PET/CT imaging, 
and this double-digit measurement represents a critical milestone. It means the system is designed to deliver fast and detailed scans at low dose.',
'',
'',
'Innovations with a 40-mm detector at 0.35-sec rotation speed.
Up to 60% lower CO2 emissions using the energy saving mode.
Advanced applications to help clinicians make a fast and confident diagnosis.
ASiR2 technology may allow for reduced mA in the acquisition of diagnostic images.
Simplified workflow for quick and streamlined operation.
Scalable, modular design for ease of service.
128-slice axial overlapped reconstruction for improved Z-axis visualization compared to non-overlapped reconstruction.',
'',
350000);

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
INSERT INTO CATEGORYONE (name) VALUES ('Radiography'), ('PET/CT');


CREATE TABLE IF NOT EXISTS CATEGORYTWO (
	id INT(11) NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	categoryone_id INT(11) NOT NULL,
	PRIMARY KEY (id)
);
TRUNCATE CATEGORYTWO;
INSERT INTO CATEGORYTWO (name,categoryone_id) VALUES ('Fixed RAD Systems',1), ('Mobile X-Ray Systems',1), ('PET/CT Scanners',2);

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
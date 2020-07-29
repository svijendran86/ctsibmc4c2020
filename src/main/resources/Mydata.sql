CREATE DATABASE test;

USE test;
CREATE TABLE preference(
	id INT(10) NOT NULL AUTO_INCREMENT,
    userId VARCHAR(150) NOT NULL,
	prefName VARCHAR(150) NOT NULL,
	prefValue VARCHAR(150) NOT NULL,
	PRIMARY KEY (userId)
);

show tables;

INSERT INTO preference VALUES (1001,'1','Jose', 'Technology');
INSERT INTO preference VALUES (1002,'2','John', 'Human Resource');
INSERT INTO preference VALUES (1003,'3','Jane', 'Delivery');



select * from preference;
drop table preference;

drop database test;

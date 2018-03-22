/*Airlines table*/
CREATE TABLE Airlines (
  AirlineCode text,
  AirlineName text
); 

/*Airports Table*/
CREATE TABLE Airports (
  Airport_Code varchar(3) NOT NULL,
  City text,
  State text,
  Airport_Name text,
  PRIMARY KEY (Airport_Code)
);

/*Customers Table*/
CREATE TABLE Customers (
  Username varchar(14) NOT NULL,
  First_Name varchar(45) DEFAULT NULL,
  Last_Name varchar(45) DEFAULT NULL,
  Email_Address varchar(45) DEFAULT NULL,
  Password char(60) DEFAULT NULL,
  PRIMARY KEY (`Username`)
);

/*Flights Table*/
CREATE TABLE Flights (
  AirlineCode varchar(3) NOT NULL,
  FlightNum int(11) NOT NULL,
  FlightDate date NOT NULL,
  Origin varchar(3) NOT NULL,
  DepartTime int(11) DEFAULT NULL,
  Destination text,
  ArrivalTime int(11) DEFAULT NULL,
  PRIMARY KEY (AirlineCode,FlightNum,FlightDate,Origin)
);

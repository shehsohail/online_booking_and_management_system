USE online_booking_and_management_system;

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
  PRIMARY KEY (Username)
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

CREATE TABLE Tickets(
  TicketNum int(11) NOT NULL,
  SeatNum int(11) NOT NULL,
  SeatAvailability boolean,
  FlightNum int(11),
  FlightDate date,  
  OrderID int(11),
  PassengerID int(11),
  PRIMARY KEY (TicketNum,SeatNum),
  FOREIGN KEY (FlightNum) REFERENCES Flights(AirlineCode,FlightNum,FlightDate,Origin)
  		ON UPDATE CASCADE
		ON DELETE CASCADE,
  FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
  		ON DELETE CASCADE,
  FOREIGN KEY (PassengerID) REFERENCES Passengers(PassengerID)
  		ON DELETE CASCADE
);

CREATE TABLE Orders(
  OrderID int(11) NOT NULL,
  OrderStatus varchar(14),
  Customer_Username varchar(14),
  PRIMARY KEY (OrderID),
  FOREIGN KEY (Customer_Username) REFERENCES Customers(Username)
  		ON UPDATE CASCADE
		ON DELETE CASCADE
);

CREATE TABLE Passengers(
  PassengerID int(11) NOT NULL,
  FirstName varchar(45),
  LastName varchar(45),
  DateOfBirth date,
  Gender varchar(14),
  PRIMARY KEY (PassengerID)
);

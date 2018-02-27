USE online_booking_and_management_system;

CREATE TABLE Airlines(
	Airline_ID INT NOT NULL, 
    Airline_Description varchar(64),
    PRIMARY KEY(Airline_ID)
    );

CREATE TABLE City_of_Airports(
	City_Market_ID INT NOT NULL, 
    City_Name varchar(128),
    PRIMARY KEY(City_Market_ID)
    );

CREATE TABLE State_of_Airports(
	State_Code VARCHAR(5) NOT NULL,
    State_Name VARCHAR(64),
    PRIMARY KEY(State_Code)
    );

CREATE TABLE Airports(
	Airport_Code VARCHAR(5) NOT NULL,
	Airport_Name VARCHAR(128),
    PRIMARY KEY(Airport_Code)
    );

CREATE TABLE Flights(
	Flight_Date Date NOT NULL,
	Airline_ID INT,
    Flight_Num INT NOT NULL, 
    Depart_Time TIME, 
    Depart_Airport VARCHAR(5),
	Depart_Airport_City_ID INT,
    Depart_Airport_State VARCHAR(5),
    Arrival_Time TIME,
    Arrival_Airport VARCHAR(5), 
	Arrival_Airport_City_ID INT,
	Arrival_Airport_State VARCHAR(5),
    Distance INT,
    
    PRIMARY KEY(Flight_Num,Flight_Date),
    FOREIGN KEY(Depart_Airport) references Airports(Airport_Code)
		ON UPDATE CASCADE
        ON DELETE CASCADE,
	FOREIGN KEY(Arrival_Airport) references Airports(Airport_Code)
		ON UPDATE CASCADE
        ON DELETE CASCADE,
	FOREIGN KEY(Depart_Airport_City_ID) references City_of_Airports(City_Market_ID)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
    FOREIGN KEY(Arrival_Airport_City_ID) references City_of_Airports(City_Market_ID)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY(Depart_Airport_State) references State_of_Airports(State_Code)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY(Arrival_Airport_State) references State_of_Airports(State_Code)
		ON UPDATE CASCADE
		ON DELETE CASCADE,
	FOREIGN KEY(Airline_ID) references Airlines(Airline_ID)
    );

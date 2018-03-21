CREATE TABLE `Flights` (
  `AirlineCode` varchar(3) NOT NULL,
  `FlightNum` int(11) NOT NULL,
  `FlightDate` date NOT NULL,
  `Origin` varchar(3) NOT NULL,
  `DepartTime` int(11) DEFAULT NULL,
  `Destination` text,
  `ArrivalTime` int(11) DEFAULT NULL,
  PRIMARY KEY (`AirlineCode`,`FlightNum`,`FlightDate`,`Origin`)
)
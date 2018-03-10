CREATE TABLE `Customers` (
  `Username` varchar(14) NOT NULL,
  `First_Name` varchar(45) DEFAULT NULL,
  `Last_Name` varchar(45) DEFAULT NULL,
  `Email_Address` varchar(45) DEFAULT NULL,
  `Password` char(60) DEFAULT NULL,
  PRIMARY KEY (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

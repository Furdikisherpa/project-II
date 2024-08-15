-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 13, 2024 at 08:10 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `musicianspot`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `AdminID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Role` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `artist`
--

CREATE TABLE `artist` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `Genre` varchar(50) DEFAULT NULL,
  `Bio` text DEFAULT NULL,
  `MediaGallery` text DEFAULT NULL,
  `PricingInfo` varchar(100) DEFAULT NULL,
  `ContactInfo` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `artist`
--

INSERT INTO `artist` (`id`, `username`, `Name`, `password`, `email`, `Genre`, `Bio`, `MediaGallery`, `PricingInfo`, `ContactInfo`) VALUES
(1, 'Furdiki', 'Furdki ', '$2a$10$.GmQJvrmkfUgbLAA9kBkLO/bgyKdX9GFN3sNlfejBCVaotsuTv1j2', 'furdikisherpa16@gmail.com', 'pop', 'kjsdbfdsjfbdsj', NULL, NULL, NULL),
(2, 'Furdiki1', 'Furdki ', '$2a$10$zpB4PAmHhCOZOm7XpAek.eDRISeQ99iesLJxasD40Wj.c549M.PF2', 'furdikisherpa@gmail.com', 'pop', 'kjsdbfdsjfbdsj', NULL, NULL, NULL),
(3, 'Furdiki2', 'Furdki ', '$2a$10$Edq6vmSXvL.ilTzwfRMJLug8T6XoX4mHj6mmhBh1g4xub2P8Cg0gS', 'furdikisherp@gmail.com', 'pop', 'kjsdbfdsjfbdsj', 'file', '200', 2147483647),
(4, 'Sumi', 'sumi', 'sumi123**', 'sumi@gmail.com', 'pop', NULL, NULL, NULL, 2147483647),
(5, 'Saugat', 'saugat', '$2a$10$V.HztamhVjDwl6Y9Z38ucOXAKDvcd9UL2SjenVKP304XmeJJGKkCe', 'saugat@gmail.com', 'pop', NULL, NULL, NULL, 2147483647),
(6, 'Tenzy', 'tenzy', '$2a$10$Hm3XVfp06uQ0HGlqaeAtKeCai2lW5nC5tcmUNqf8EgWR2mMoh/GU.', 'tenzy@gmail.com', NULL, NULL, NULL, NULL, NULL),
(7, 'Soniya', '', '$2a$10$8MICagNN5PyLUXPMjGWGkOWlLlxLNl33Udc0mnEEjf4zjaLh3CQKe', 'Soniya@gmail.com', NULL, NULL, NULL, NULL, NULL),
(8, 'tenzy1', '', '$2a$10$vHTfENoH0VA3qkhkdB1S2.EudBF0RNyuEpTuvbDa8s5Ed1y9nfCWu', 'tenzy1@gmail.com', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `BookingID` int(11) NOT NULL,
  `BookingDate` datetime NOT NULL DEFAULT current_timestamp(),
  `EventDate` datetime NOT NULL,
  `UserID` int(11) NOT NULL,
  `ArtistID` int(11) NOT NULL,
  `Status` varchar(50) NOT NULL,
  `TotalPrice` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`BookingID`, `BookingDate`, `EventDate`, `UserID`, `ArtistID`, `Status`, `TotalPrice`) VALUES
(1, '2024-07-29 00:00:00', '2024-08-02 00:00:00', 4, 3, 'pending', 4000.00),
(2, '2024-07-29 22:07:29', '2024-07-30 00:00:00', 2, 1, 'pending', 4000.00);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `MessageID` int(11) NOT NULL,
  `SenderID` int(11) NOT NULL,
  `ReceiverID` int(11) NOT NULL,
  `Date` date NOT NULL DEFAULT current_timestamp(),
  `Content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`MessageID`, `SenderID`, `ReceiverID`, `Date`, `Content`) VALUES
(1, 4, 3, '0000-00-00', 'zxmczxkcvbjvs'),
(2, 3, 2, '2024-07-29', 'hello');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `ReviewID` int(11) NOT NULL,
  `Rating` int(11) NOT NULL,
  `Comment` text DEFAULT NULL,
  `ReviewDate` datetime NOT NULL DEFAULT current_timestamp(),
  `UserID` int(11) NOT NULL,
  `ArtistID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`ReviewID`, `Rating`, `Comment`, `ReviewDate`, `UserID`, `ArtistID`) VALUES
(1, 4, 'nice', '2024-07-29 00:00:00', 1, 2),
(2, 4, 'nice', '2024-07-29 22:04:13', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `ProfilePicture` varchar(255) DEFAULT NULL,
  `Name` varchar(100) NOT NULL,
  `ContactInfo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `Username`, `password`, `email`, `ProfilePicture`, `Name`, `ContactInfo`) VALUES
(1, 'saugat123', '$2a$10$wLDUNR.fAoEz4N.0pOuNdu6Yvq3XW9nxQPjNjuBt4qeg6mOLLrS9S', 'saugat@gmail.com', NULL, 'Saugat SThapit', '9856745566'),
(2, 'Furdiki Sherpa', '$2a$10$CjF6sBiv.4wujwRzmS19H.MV5grDSbf4sEL6qD45Mpbeukbyu6Knu', 'furdikisherpa16@gmail.com', NULL, 'Furdiki Sherpa', '9876577556'),
(3, 'Sumi123', '$2a$10$DeL7Q.N9l5c.EFZWtr2bZeYJDqiX.2yyFIxm5J2BOUytxaxx7sBBS', 'sumi@gmail.com', NULL, 'Sumi SHerpa', '9878678987'),
(4, 'Pasang', '$2a$10$qhcqAM3Wz90uBlJyugx6Dec593k9VJrYXOoeoBnX2wrKvvPDjhXY.', 'pasange@gmail.com', NULL, 'Pasang Sherpa', '9786756476'),
(6, 'sumi1234', '$2a$10$0yrcX.2MvyhV55cSgTBTS..eKUR7y4iTQNjfHbzV8VFPhJqBHqNCm', 'sumi1@gmail.com', NULL, 'sumi sherpa', '9847698214'),
(7, 'sumi4', '$2a$10$0zGvR53dK7YAMxTm3nii1ObdkLhqMIsuG5s4Uz6hCwC0YhUJ84Nk.', 'sumi33@gmail.com', NULL, 'Sumi Sherpa', '9876543255'),
(8, 'furdiki2', '$2a$10$dfOGVkp0XRuOwGFnzW.3jeujoV5w.R2oNlC5HiHYxTHaMwlPJuwOi', 'furdiki123@gmail.com', NULL, 'FurdikiSherpa', '9887665445'),
(9, 'Tenzy1', '$2a$10$tkZBOh4SDW4.9wRdkKWEw.Dt4.l8I42Q8C/h/b2vLLcamt5ta9epS', 'tenzy1@gmail.com', NULL, '', NULL),
(10, 'Soniya', '$2a$10$yBEDkb1QEY5kMfv.Yo6fNuvNs7RZIQ2jwc4V5uTIVRxIgGYw5zL4K', 'soniya@gmail.com', NULL, '', NULL),
(11, 'tenzy', '$2a$10$PTByRMkv/3Yo7ozW7htR0O/90l4KW821gsVNZbpukK0NVW2HCxXc6', 'tenzy@gmail.com', NULL, '', NULL),
(14, 'soniya1', '$2a$10$7d0Oyv7KDUqAa9bDG9Qepu7CS7M51BsbMF8svjF3dXb3HUoAEcmWW', 'soniya1@gmail.com', NULL, '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `Videotitle` varchar(255) NOT NULL,
  `videoUrl` varchar(255) NOT NULL,
  `artistId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `Videotitle`, `videoUrl`, `artistId`, `userId`) VALUES
(1, '', 'https://youtu.be/10u3ofycxnw?si=5qTQU9EmqVenD6iP', 5, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`AdminID`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- Indexes for table `artist`
--
ALTER TABLE `artist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`BookingID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `ArtistID` (`ArtistID`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`MessageID`),
  ADD KEY `SenderID` (`SenderID`),
  ADD KEY `ReceiverID` (`ReceiverID`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`ReviewID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `ArtistID` (`ArtistID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Email` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artistId` (`artistId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `AdminID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `artist`
--
ALTER TABLE `artist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `BookingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `MessageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `ReviewID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `booking_ibfk_2` FOREIGN KEY (`ArtistID`) REFERENCES `artist` (`id`);

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`SenderID`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`ReceiverID`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`ArtistID`) REFERENCES `artist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`artistId`) REFERENCES `artist` (`id`),
  ADD CONSTRAINT `videos_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

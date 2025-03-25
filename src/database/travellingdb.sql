-- TravellingDB Database Structure
-- Generated on: 17-03-2025
-- Author: @alexvegasdev - @ladyPS15 - @noeliauj
-- Uso: Ejecutar en SQL Server Management Studio para crear la base de datos y las tablas

-- Create database
CREATE DATABASE travellingdb;
GO

-- Use the database
USE travellingdb;
GO

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
GO

-- Airports table
CREATE TABLE airports (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE -- IATA code (e.g., "LIM", "JFK")
);
GO

-- Flights table
CREATE TABLE flights (
    id INT PRIMARY KEY IDENTITY(1,1),
    airline VARCHAR(100) NOT NULL,
    departure_airport_id INT NOT NULL,
    destination_airport_id INT NOT NULL,
    departure_datetime DATETIME2 NOT NULL,
    arrival_datetime DATETIME2 NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(1000) NOT NULL,
    FOREIGN KEY (departure_airport_id) REFERENCES airports(id),
    FOREIGN KEY (destination_airport_id) REFERENCES airports(id)
);
GO

-- Reservations table
CREATE TABLE reservations (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    flight_id INT NOT NULL,
    reservation_date DATETIME2 DEFAULT GETDATE(),
    passenger_count INT NOT NULL,
    total_price DECIMAL(7,2) NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pendiente', 'confirmado', 'cancelado')),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (flight_id) REFERENCES flights(id)
);
GO

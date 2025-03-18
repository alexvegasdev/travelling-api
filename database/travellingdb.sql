-- TravellingDB Database Structure
-- Generated on: 17-03-2025
-- Author: @alexvegasdev - @ladyPS15 - @noeliauj
-- Uso: Ejecutar en SQL Server Management Studio para crear la base de datos y las tablas

-- Crear base de datos
CREATE DATABASE travellingdb;
GO

-- Usar la base de datos
USE travellingdb;
GO

-- Crear tabla de usuarios
CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
GO

-- Crear tabla de destinos
CREATE TABLE destinations (
    id INT PRIMARY KEY IDENTITY(1,1),
    name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    description VARCHAR(500) NULL,
    price FLOAT NOT NULL
);
GO

-- Crear tabla de reservas
CREATE TABLE reservations (
    id INT PRIMARY KEY IDENTITY(1,1),
    user_id INT NOT NULL,
    destination_id INT NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (destination_id) REFERENCES destinations(id)
);
GO

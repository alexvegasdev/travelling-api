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

INSERT INTO airports (name, city, country, code)
VALUES
('John F. Kennedy International Airport', 'New York', 'USA', 'JFK'),
('Lima International Airport', 'Lima', 'Peru', 'LIM'),
('Charles de Gaulle Airport', 'Paris', 'France', 'CDG'),
('Heathrow Airport', 'London', 'UK', 'LHR'),
('Tokyo International Airport', 'Tokyo', 'Japan', 'HND');
INSERT INTO flights (airline, departure_airport_id, destination_airport_id, departure_datetime, arrival_datetime, price, image_url) VALUES
-- ✈️ 2 vuelos a Lima (LIM)
('Avianca', 2, 1, '2024-03-25 14:00:00', '2024-03-25 18:00:00', 310.75, 'https://www.peru.travel/Contenido/Atractivo/Imagen/es/43/1.1/Principal/miraflores-costa-verde.jpg'),
('Iberia', 4, 1, '2024-03-26 13:00:00', '2024-03-27 05:30:00', 790.00, 'https://images.adsttc.com/media/images/5cdc/4559/284d/d19e/3300/01de/large_jpg/Lima_centro_32.jpg?1557939530'),
 
-- ✈️ 3 vuelos a Bogotá (BOG)
('LATAM', 1, 2, '2024-03-25 08:00:00', '2024-03-25 12:00:00', 320.50, 'https://blog.urbansa.co/hubfs/Centro%20de%20la%20ciudad%20-%20El%20centro%20de%20Bogot%C3%A1-Bogot%C3%A1%20de%20noche.jpg'),
('Avianca', 4, 2, '2024-03-27 16:45:00', '2024-03-28 05:15:00', 765.50, 'https://news.delta.com/sites/default/files/styles/article_width_full/public/2023-10/bogota_1.png.jpg?itok=8QqI_Z_h'),
('Copa Airlines', 3, 2, '2024-04-01 08:00:00', '2024-04-01 12:00:00', 370.00, 'https://news.delta.com/sites/default/files/styles/article_width_full/public/2023-10/bogota_1.png.jpg?itok=8QqI_Z_h'),
 
-- ✈️ 4 vuelos a Buenos Aires (EZE)
('Aeroméxico', 1, 3, '2024-04-08 12:00:00', '2024-04-08 18:00:00', 410.00, 'https://cdn.britannica.com/40/195440-050-B3859318/Congressional-Plaza-building-National-Congress-Buenos-Aires.jpg'),
('Aerolíneas Argentinas', 2, 3, '2024-03-28 08:15:00', '2024-03-28 13:30:00', 405.75, 'https://services.meteored.com/img/article/buenos-aires-origen-y-significado-del-nombre-de-la-capital-argentina-1705114490713_1280.jpg'),
('Air Europa', 4, 3, '2024-03-27 22:00:00', '2024-03-28 12:00:00', 800.00, 'https://blog.girolibero.it/wp-content/uploads/2019/06/Buenos-Aires-El-Caminito-Boca-happytobehere-miprendoemiportovia.jpg'),
('British Airways', 4, 3, '2024-04-07 20:30:00', '2024-04-08 10:30:00', 845.00, 'https://scontent.ccdn.cloud/image/vivitravels-en/5355bc35-3e8c-4ed5-95d6-ed5821207a17/maxw-960.jpg'),
 
-- ✈️ 1 vuelo a Madrid (MAD)
('KLM', 2, 4, '2024-04-05 19:00:00', '2024-04-06 07:00:00', 710.00, 'https://dmn-dallas-news-prod.cdn.arcpublishing.com/resizer/v2/46AXQFD5Z5AEHHLNME22AATVZA.JPG?auth=cfaa6feb44404d06fc8bcba674ba2c00eb75ad8218960f6fbcd24b90c9504443&height=553&width=830&smart=true&quality=80');
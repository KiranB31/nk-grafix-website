-- Database Schema for Grafix Professional Website

CREATE DATABASE IF NOT EXISTS grafix_db;
USE grafix_db;

-- Business Information
CREATE TABLE IF NOT EXISTS business_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(100) DEFAULT 'Grafix',
    address TEXT,
    email VARCHAR(100),
    phone VARCHAR(20),
    philosophy TEXT,
    vision TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Admin Users
CREATE TABLE IF NOT EXISTS admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products
CREATE TABLE IF NOT EXISTS products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price VARCHAR(20) NOT NULL,
    description TEXT,
    image_url TEXT,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Staff Members
CREATE TABLE IF NOT EXISTS staff (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    image_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages & Visitor Logs
CREATE TABLE IF NOT EXISTS visitor_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    visitor_ip VARCHAR(45),
    user_agent TEXT,
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Business Info
INSERT INTO business_info (company_name, email, phone) 
SELECT 'Grafix', 'hello@grafix.com', '+1 (555) 123-4567'
WHERE NOT EXISTS (SELECT 1 FROM business_info);

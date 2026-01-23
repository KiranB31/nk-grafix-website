-- Database Schema for Grafix Professional Website (PostgreSQL)

-- Create and Switch to Schema 'grafix'
CREATE SCHEMA IF NOT EXISTS grafix;
SET search_path TO grafix;

-- Business Information
CREATE TABLE IF NOT EXISTS business_info (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) DEFAULT 'Grafix',
    address TEXT,
    email VARCHAR(100),
    phone VARCHAR(20),
    philosophy TEXT,
    vision TEXT,
    owner_name VARCHAR(100),
    about_image_url TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stored Images (BLOB storage for Vercel persistence)
CREATE TABLE IF NOT EXISTS stored_images (
    id VARCHAR(50) PRIMARY KEY,
    data BYTEA NOT NULL,
    mime_type VARCHAR(50) NOT NULL,
    filename VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin Users
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price VARCHAR(20) NOT NULL,
    description TEXT,
    image_url TEXT,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Staff Members
CREATE TABLE IF NOT EXISTS staff (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    image_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Visitor Logs
CREATE TABLE IF NOT EXISTS visitor_logs (
    id SERIAL PRIMARY KEY,
    visitor_ip VARCHAR(45),
    user_agent TEXT,
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    author VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Initial Data
INSERT INTO business_info (company_name, email, phone, owner_name) 
SELECT 'Grafix', 'hello@grafix.com', '+1 (555) 123-4567', 'Creative Admin'
WHERE NOT EXISTS (SELECT 1 FROM business_info);

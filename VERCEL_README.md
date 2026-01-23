# Deployment Guide for Grafix Website (Vercel + PostgreSQL)

This project has been fully migrated from Spring Boot to a modern **Node.js** serverless application, optimized for deployment on **Vercel** with a **PostgreSQL** database.

## 1. Prerequisites

- **GitHub Account**: Push this code to a new GitHub repository.
- **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
- **PostgreSQL Database**: You need a hosted Postgres database. Recommended options:
  - **Vercel Postgres** (Integrated, easiest)
  - **Supabase**
  - **Neon**
  - **Railway**

## 2. Environment Variables

You must configure the following environment variable in your Vercel Project Settings:

- `POSTGRES_URL`: The full connection string to your PostgreSQL database.
  - Example: `postgres://user:password@hostname.com:5432/databasename?sslmode=require`

Optional but recommended for security:
- `JWT_SECRET`: A random string for signing admin login tokens.

## 3. Database Setup (One-Time)

After setting up your database, you need to create the tables.

1. Connect to your database using a tool like **pgAdmin**, **DBeaver**, or the command line.
2. Run the contents of the `setup.sql` file included in this repository.
   - This script creates all necessary tables (`products`, `admins`, `business_info`, `blog_posts`, etc.) and inserts initial default data.

## 4. Deploying to Vercel

1. **Import Project**: Go to Vercel Dashboard -> Add New -> Project -> Import from GitHub.
2. **Configure**: Vercel should automatically detect it as a static functionality or Node project.
3. **Environment**: Add the `POSTGRES_URL` variable in the "Environment Variables" section during import.
4. **Deploy**: Click Deploy.

## 5. Admin Portal Access

1. Once deployed, go to `/login`.
2. First-time setup: You will need to manually insert an admin user into the database securely, or use the `/register` endpoint if you enabled public registration (current logic checks if *any* admin exists before allowing registration, so the first user can register freely).
   - **Tip**: Go to `/register` immediately after deployment to create your first Admin account.
3. Login and navigate to `/admin/dashboard`.

## 6. Dynamic Content Management

As requested, all content on the portal is dynamic and manageable by the Admin:
- **Products**: Add/Remove products via Admin -> Products.
- **Blog**: Publish news via Admin -> Blog.
- **Business Info**: Change email, phone, address, and philosophy via **Admin -> Settings (Profile)**.
  - This immediately updates the Footer, Contact Page, and Home Page headers.

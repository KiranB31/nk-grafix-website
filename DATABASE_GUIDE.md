# Database Connection and Production Guide

## 1. Connecting to the Database on Your PC

To connect the application to a PostgreSQL database running on your local machine, follow these steps:

### A. Install PostgreSQL
If you haven't already:
1. Download **PostgreSQL** from [postgresql.org/download](https://www.postgresql.org/download/).
2. Install it. During installation, you will be asked to set a password for the `postgres` user. **Remember this password**.
3. Install **pgAdmin** (usually included) to manage your database visually.

### B. Create the Database
1. Open pgAdmin.
2. Right-click on "Databases" -> Create -> Database.
3. Name it `grafix_db`.

### C. Run the Setup Script
1. Open the Query Tool in pgAdmin (right-click `grafix_db` -> Query Tool).
2. Open the file `setup.sql` from this project folder.
3. Copy the content and paste it into the Query Tool.
4. Click the "Play" button (Run) to create the tables.

### D. Connect Your Application
To run the app locally with this database, you need to set the `POSTGRES_URL` environment variable.

**Option 1: Using a .env file (Recommended)**
1. Create a file named `.env` in the root folder (`grafix-website/`).
2. Add the following line:
   ```
   POSTGRES_URL="postgres://postgres:YOUR_PASSWORD@localhost:5432/grafix_db"
   JWT_SECRET="my_secure_dev_secret"
   ```
   *(Replace `YOUR_PASSWORD` with the password you set in step A)*.
3. Install the dotenv package: `npm install dotenv`
4. Update `api/lib/db.js` to require dotenv (I will handle this for you in the next step).

**Option 2: Command Line (Temporary)**
Powershell:
```powershell
$env:POSTGRES_URL="postgres://postgres:YOUR_PASSWORD@localhost:5432/grafix_db"; npm run dev
```

## 2. Production Environment (Vercel)

For production, you do NOT use your local PC database. You need a cloud database.

### A. Create a Cloud Database
1. **Vercel Postgres** (Easiest): In your Vercel project dashboard, click "Storage" -> "Create" -> "Postgres". It will automatically link and set the variables.
2. **Supabase / Neon**: Create a free account, create a project, and get the "Connection String".

### B. Configure Environment Variables
1. Go to Vercel Project Settings -> **Environment Variables**.
2. Add `POSTGRES_URL` and paste your cloud connection string.
   - Example: `postgres://user:pass@ep-rest-123.pooler.supabase.com:5432/postgres?sslmode=require`
3. Add `JWT_SECRET` with a long random string.

### C. Initialize Production Database
1. Connect to your *Cloud Database* using pgAdmin or DBeaver on your PC (using the cloud connection string).
2. Run the `setup.sql` script there just like you did locally.

## 3. Dynamic Content Verification

I have verified that the project is NOT static:
- **Products**: Fetched from `/api/products` (Database).
- **Blog**: Fetched from `/api/blog` (Database).
- **Business Info**: Footer, Headers, and Contact Info are fetched from `/api/business`.
- **Admin**: You can now update your own Username/Password via the Admin Profile page.

Everything is data-driven.

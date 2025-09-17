# Multi-Tenant Notes App

This project is a **Next.js 15 + TypeScript** web application with **Prisma ORM** connected to **Supabase PostgreSQL**.  
It includes authentication, database seeding, and deployment on **Vercel**.

---

## 🚀 Features
- ✅ Next.js 15 with TypeScript  
- ✅ Authentication (Login & Register)  
- ✅ Prisma ORM for database modeling  
- ✅ Supabase PostgreSQL as database  
- ✅ Database seeding with Prisma  
- ✅ Deployment on Vercel  

---

## 📂 Project Structure
```

.
├── prisma/            # Prisma schema & migrations
├── src/
│   ├── app/           # Next.js App Router
│   ├── lib/           # DB connection & utilities
│   ├── components/    # Reusable components
│   └── pages/         # Routes (if used)
├── .env.local         # Local environment variables
├── package.json
└── README.md

````

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone <your-repo-url>
cd <your-project-name>
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root folder:

```env
DATABASE_URL=your_supabase_URL
NEXT_PUBLIC_JWT_SECRET=your_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> Replace `<project-ref>` and `[YOUR-PASSWORD]` with your **Supabase credentials**.
> You can find them in **Supabase → Project Settings → Database**.

---

## 🛠️ Prisma Setup

### 4️⃣ Generate Prisma Client

```bash
npx prisma generate
```

### 5️⃣ Run Migrations

```bash
npx prisma migrate deploy
```

### 6️⃣ Seed Database

Add your seeding logic in `prisma/seed.ts`, then run:

```bash
npx prisma db seed
```

---

## 🧪 Run Locally

```bash
npm run dev
```

App will run on: **[http://localhost:3000](http://localhost:3000)**

---

## 🌍 Deployment on Vercel

1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com).
3. Import your repository.
4. Add environment variables (`DATABASE_URL`) in **Project → Settings → Environment Variables**.
5. Deploy 🚀

---

## ✅ Verification

* Check Prisma connection:

```bash
npx prisma studio
```

* Check logs in Vercel if errors occur:

```bash
vercel logs <deployment-url>
```

---

## 📌 Tech Stack

* **Next.js 15**
* **TypeScript**
* **Prisma ORM**
* **Supabase PostgreSQL**
* **Vercel**


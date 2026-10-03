# FullStack JavaScript Developer - Express.js RESTful API & React Native

Repository ini berisi implementasi RESTful API Backend menggunakan **Express.js**, **Prisma ORM**, **Express Validator**, **Multer**, dan integrasi **React Native** berbasis kursus SantriKoding.

## 🚀 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js (ES Modules)
- **ORM & Database**: Prisma ORM & MySQL
- **Middleware**: CORS, Body Parser, Multer, Express Validator
- **Frontend / Mobile**: React Native

## 📂 Struktur Project Backend
```text
santrikoding-express-api/
├── prisma/
│   ├── client/
│   │   └── index.js       # Helper Prisma Client
│   └── schema.prisma      # Schema database MySQL
├── .env                   # Environment variables (Database URL)
├── index.js               # Entry point server Express
└── package.json           # Dependencies & scripts
```

## 🛠️ Cara Menjalankan Project

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Setup Database (`.env`)**:
   Pastikan MySQL aktif dan database terbuat, lalu sesuaikan connection string di `.env`:
   ```env
   DATABASE_URL="mysql://root:@localhost:3306/db_express_api"
   ```

3. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

4. **Jalankan Migrasi Database**:
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Jalankan Server Development**:
   ```bash
   npm run dev
   ```
   Server akan berjalan di `http://localhost:3000`.

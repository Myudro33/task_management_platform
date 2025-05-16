# Project 2: Task Management Platform Backend API

---

## პროექტის აღწერა

შექმენი **Task Management API**, სადაც კომპანიის თანამშრომლებს ენიჭებათ დავალებები, კომენტარები და ფაილები. სისტემა იყენებს ავტორიზაციას და როლების მართვას.

---

## ძირითადი რესურსები (Entities)

### 1. User

- რეგისტრირებული თანამშრომელი ან ადმინისტრატორი.

**User მოდელის ველები:**

- `id` — უნიკალური იდენტიფიკატორი
- `name` — სახელი
- `email` — უნიკალური იმეილი
- `password` — დაშიფრული პაროლი
- `role` — "admin" ან "employee"
- `department` — სექცია/განყოფილება
- `avatar` — პროფილის სურათი

### 2. Task

- დავალება, რომელიც ენიჭება კონკრეტულ თანამშრომელს.

**Task მოდელის ველები:**

- `id`
- `title` — დავალების სათაური
- `description` — დეტალები
- `status` — "pending" | "in_progress" | "done"
- `dueDate` — ვადა
- `assigneeId` — ვის ენიჭება
- `createdById` — ვინ შექმნა
- `comments[]`
- `files[]`

### 3. Comment

- დავალებაზე დაწერილი კომენტარი.

**Comment მოდელის ველები:**

- `id`
- `taskId`
- `userId`
- `content`
- `createdAt`

### 4. File

- ფაილი, რომელიც ატვირთულია დავალებაზე.

**File მოდელის ველები:**

- `id`
- `taskId`
- `filename`
- `url`
- `uploadedBy`

---

## Authentication და Authorization

- JWT-based ლოგინი და რეგისტრაცია
- როლები:
  - **Admin** — ხედავს ყველაფერს, ქმნის და ანიჭებს დავალებებს
  - **Employee** — ხედავს და მართავს მხოლოდ საკუთარ დავალებებს

---

## API Endpoint-ები

### Authentication

- `POST /api/auth/register` — (მხოლოდ Admin)
- `POST /api/auth/login`

### Users

- `GET /api/users/me`
- `GET /api/users/` — (მხოლოდ Admin)
- `PATCH /api/users/:id` — პროფილის განახლება

### Tasks

- `POST /api/tasks/` — შექმნა (Admin)
- `GET /api/tasks/` — სიაში ყველა დავალება (Admin) ან პირადი (Employee)
- `PATCH /api/tasks/:id` — განახლება
- `DELETE /api/tasks/:id` — წაშლა (Admin)

### Comments

- `POST /api/tasks/:id/comments`
- `GET /api/tasks/:id/comments`

### Files

- `POST /api/tasks/:id/files` — ფაილის ატვირთვა
- `GET /api/tasks/:id/files` — ფაილების სია

---

## ფუნქციონალი

- **პაროლის დაშიფვრა** — bcrypt
- **ავტორიზაციის Middleware**
- **დავალების მინიჭებისას ელფოსტის შეტყობინება**
- **ფაილების ატვირთვა (Multer)**
- **Swagger დოკუმენტაცია**
- **Error Handling & Validation**
- **CORS კონფიგურაცია**

---

## ტექნოლოგიები

- Node.js
- Express.js ან NestJS
- MongoDB (Mongoose) ან PostgreSQL (Prisma)
- JWT
- Multer
- Nodemailer
- Swagger
- dotenv

---

# მოკლე flow:

```
1. Admin რეგისტრირდება და ქმნის თანამშრომლებს
2. თანამშრომელს ენიჭება დავალება
3. თანამშრომელი ხედავს დავალებას, იცვლის სტატუსს, ტოვებს კომენტარს
4. შეიძლება ფაილების ატვირთვა დავალებაზე
5. Admin აკონტროლებს სრულ პროცესს
```

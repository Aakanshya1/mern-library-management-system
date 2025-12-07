require("dotenv").config();
require("./connection/conn");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const AuthRouter = require("./routes/AuthRouter");
const DashboardRouter = require("./routes/DashboardRouter");
const BooksRouter = require("./routes/BooksRouter");

const BookModel = require("./Models/Books");
const { checkOverdueBooksAndNotify } = require("./tasks/Notify");
const { processQueue } = require("./Controllers/BookController");
const calculateFines = require("./tasks/FineCalculator");
const cron = require("node-cron");

// ALLOWED ORIGINS FIX
const allowedOrigins = [
  "https://mern-library-management-system.vercel.app",
  "http://localhost:5173",
  "https://mern-library-management-system-h946.onrender.com",
];

// Preflight fix
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// CORS fix
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);

      console.log("❌ BLOCKED BY CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/auth", AuthRouter);
app.use("/api", DashboardRouter);
app.use("/books", BooksRouter);

// Cron jobs
cron.schedule("0 20 * * *", () => {
  console.log("Checking for overdue books at 8 PM...");
  checkOverdueBooksAndNotify();
});

cron.schedule("0 * * * *", async () => {
  console.log("Checking available books and processing reservations...");
  const books = await BookModel.find({ bookCount: { $gt: 0 } });
  for (const book of books) {
    console.log(`Processing book ID: ${book._id}`);
    await processQueue(book._id);
  }
});

cron.schedule("0 0 * * *", () => {
  console.log("Calculating fines");
  calculateFines();
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

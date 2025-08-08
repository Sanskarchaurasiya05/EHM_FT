import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { AuthAdminRouter } from "./routes/AuthAdmin";
import { BlogUserRouter } from "./routes/BlogUser";
import { BlogAdminRouter } from "./routes/BlogAdmin";
import { NewsletterUserRouter } from "./routes/NewsLetterUser";
import { NewsletterAdminRouter } from "./routes/NewsLetterAdmin";
import { ArticleAdminRouter } from "./routes/ArticleAdmin";
import { ArticleUserRouter } from "./routes/ArticleUser";

const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173", // replace with frontend URL
  })
);

app.use(express.json());

//Admin auth routes
app.use("/admin", AuthAdminRouter);

//Admin Blog routes
app.use("/admin", BlogAdminRouter);

//User Blog routes
app.use("/", BlogUserRouter);

//Admin Article routes
app.use("/admin", ArticleAdminRouter);

//User Aricle routes
app.use("/", ArticleUserRouter);

//This allows the frontend to load the image like:
//http://localhost:PORT/uploads/imagename.jpg
app.use("/uploads", express.static(path.resolve("uploads")));

//user newsletter route
app.use("/", NewsletterUserRouter);

//admin newsletter route
app.use("/admin", NewsletterAdminRouter);

//connecting to mongoDb
async function connectDB() {
  try {
    const uri = process.env.MONGO_URL!;
    await mongoose.connect(uri);
  } catch (error: any) {
    console.log(`error: ${error}`);
    process.exit(1);
  }
}

connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import PORT from "./config/app.js";
import authRouter from "./routes/AuthRoutes.js";
import extractUidAndVerification from "./middlewares/extractUidAndVerification.js";
import adminVerificationRouter from "./routes/AdminOrganizationVertifyRoutes.js";
import notificationRouter from "./routes/organization/NotificationRoutes.js";
import jobRouters from "./routes/organization/JobRoutes.js";
import trainingRouter from "./routes/organization/TrainingRoutes.js";
import contactUsRouter from "./routes/ContactUsRoutes.js";
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
dotenv.config();
app.use(bodyParser.json());
app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use((err, _, res, __) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.use("/auth", authRouter);
app.use("/contact/us", contactUsRouter);
app.use(extractUidAndVerification);
app.use("/admin", adminVerificationRouter);
app.use("/org/notifications", notificationRouter);
app.use("/org/jobs", jobRouters);
app.use("/org/training", trainingRouter);

// Start the server
const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`App listening at http://${host}:${port}`);
});

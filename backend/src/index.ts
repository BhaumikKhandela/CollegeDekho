import { Hono } from "hono";
import { cors } from "hono/cors";
import { adminRouter } from "./Routes/admin";
import { userRouter } from "./Routes/user";
import { blogRouter } from "./Routes/blog";
import { SeoRouter } from "./Routes/seo";

const app = new Hono();

app.use("/*", cors());
app.route("/api/v1/admin", adminRouter);
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);
app.route("/api/v1/seo", SeoRouter);

export default app;

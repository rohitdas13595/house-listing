// app/[[...slugs]]/route.ts
import swagger from "@elysiajs/swagger";
import { Elysia, t } from "elysia";
import { runMigrations } from "./db/migrate";
import { adminController } from "./entities/admin/admin.controller";
import { adminService } from "./setup";
import { cookie } from "@elysiajs/cookie";
// import { buyerController } from "../../buyer/buyer.controller";

const app = new Elysia({ prefix: "/api" });
app.use(cookie());
app.use(
  swagger({
    path: "/docs",
    documentation: {
      tags: [
        { name: "App", description: "General endpoints" },
        { name: "Auth", description: "Authentication endpoints" },
      ],
      info: {
        title: "House Listing  API End Points",
        version: "0.1.0",
      },
      servers: [{ url: "http://localhost:3000" }],
    },
  })
);

app.get("/", () => "hello Next", {
  detail: {
    tags: ["App"],
  },
});

runMigrations();
adminController(app as any, adminService);
// buyerController(app as any, buyerService);


export { app };

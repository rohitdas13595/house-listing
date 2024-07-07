CREATE TABLE IF NOT EXISTS "drizzle_orm"."admin_role_permission" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_role_id" uuid NOT NULL,
	"permission_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle_orm"."permission" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "permission_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "drizzle_orm"."buyer" DROP CONSTRAINT "buyer_email_unique";--> statement-breakpoint
ALTER TABLE "drizzle_orm"."buyer" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."admin_role_permission" ADD CONSTRAINT "admin_role_permission_admin_role_id_admin_role_pk_fk" FOREIGN KEY ("admin_role_id") REFERENCES "drizzle_orm"."admin_role"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."admin_role_permission" ADD CONSTRAINT "admin_role_permission_permission_id_permission_pk_fk" FOREIGN KEY ("permission_id") REFERENCES "drizzle_orm"."permission"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "drizzle_orm"."admin_role" ADD CONSTRAINT "admin_role_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "drizzle_orm"."buyer" ADD CONSTRAINT "buyer_phone_unique" UNIQUE("phone");
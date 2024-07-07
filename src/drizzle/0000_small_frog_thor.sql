CREATE SCHEMA "drizzle_orm";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle_orm"."admin" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	"admin_role_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle_orm"."admin_key" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hashed_password" varchar(100) NOT NULL,
	"admin_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle_orm"."admin_role" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admin_role_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle_orm"."admin_role_permission" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_role_id" uuid NOT NULL,
	"permission_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle_orm"."admin_session" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_id" uuid NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle_orm"."buyer" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(100),
	"phone" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "buyer_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle_orm"."buyer_key" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hashed_password" varchar(100) NOT NULL,
	"buyer_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle_orm"."buyer_session" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"buyer_id" uuid NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle_orm"."city" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"district" varchar(255) NOT NULL,
	"pincode" varchar(12) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle_orm"."house_contact" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"buyer_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle_orm"."house_listing" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"listed_by_seller_id" uuid NOT NULL,
	"price" double precision DEFAULT 0 NOT NULL,
	"city_id" uuid NOT NULL,
	"area" double precision DEFAULT 0 NOT NULL,
	"location" varchar(255) NOT NULL,
	"no_of_bedrooms" integer DEFAULT 0 NOT NULL,
	"resale" boolean DEFAULT false NOT NULL,
	"maitainance_staff" integer DEFAULT 0 NOT NULL,
	"gymnasium" boolean DEFAULT false NOT NULL,
	"swimming_poll" boolean DEFAULT false NOT NULL,
	"landscaped_garden" boolean DEFAULT false NOT NULL,
	"jogging_track" boolean DEFAULT false NOT NULL,
	"rain_water_harvesting" boolean DEFAULT false NOT NULL,
	"indoor_games" boolean DEFAULT false NOT NULL,
	"shopping_mall" boolean DEFAULT false NOT NULL,
	"intercom" boolean DEFAULT false NOT NULL,
	"sports_facility" boolean DEFAULT false NOT NULL,
	"atm" boolean DEFAULT false NOT NULL,
	"club_house" boolean DEFAULT false NOT NULL,
	"school" boolean DEFAULT false NOT NULL,
	"security_24x7" boolean DEFAULT false NOT NULL,
	"power_backup" boolean DEFAULT false NOT NULL,
	"car_parking" boolean DEFAULT false NOT NULL,
	"staff_quarter" boolean DEFAULT false NOT NULL,
	"cafeteria" boolean DEFAULT false NOT NULL,
	"multipurpose_room" boolean DEFAULT false NOT NULL,
	"hospital" boolean DEFAULT false NOT NULL,
	"washingmachine" boolean DEFAULT false NOT NULL,
	"gas_connection" boolean DEFAULT false NOT NULL,
	"ac" boolean DEFAULT false NOT NULL,
	"wifi" boolean DEFAULT false NOT NULL,
	"children_play_area" boolean DEFAULT false NOT NULL,
	"lift" boolean DEFAULT false NOT NULL,
	"bed" integer DEFAULT 0 NOT NULL,
	"vaastu_compliant" boolean DEFAULT false NOT NULL,
	"microwave" boolean DEFAULT false NOT NULL,
	"golf_course" boolean DEFAULT false NOT NULL,
	"tv" boolean DEFAULT false NOT NULL,
	"dorm_table" boolean DEFAULT false NOT NULL,
	"sofa" integer DEFAULT 0 NOT NULL,
	"wardobe" integer DEFAULT 0 NOT NULL,
	"refrigerator" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle_orm"."house_seen" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"buyer_id" uuid NOT NULL,
	"listing_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle_orm"."house_wishlist" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"buyer_id" uuid NOT NULL,
	"listing_id" uuid NOT NULL,
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
CREATE TABLE IF NOT EXISTS "drizzle_orm"."seller" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(100) NOT NULL,
	"phone" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "seller_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle_orm"."seller_key" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hashed_password" varchar(100) NOT NULL,
	"seller_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle_orm"."seller_rating" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"rating" bigint NOT NULL,
	"seller_id" uuid NOT NULL,
	"rated_by_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drizzle_orm"."seller_session" (
	"pk" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"seller_id" uuid NOT NULL,
	"active_expires" bigint NOT NULL,
	"idle_expires" bigint NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."admin" ADD CONSTRAINT "admin_admin_role_id_admin_role_pk_fk" FOREIGN KEY ("admin_role_id") REFERENCES "drizzle_orm"."admin_role"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."admin_key" ADD CONSTRAINT "admin_key_admin_id_admin_pk_fk" FOREIGN KEY ("admin_id") REFERENCES "drizzle_orm"."admin"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
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
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."admin_session" ADD CONSTRAINT "admin_session_admin_id_admin_pk_fk" FOREIGN KEY ("admin_id") REFERENCES "drizzle_orm"."admin"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."buyer_key" ADD CONSTRAINT "buyer_key_buyer_id_buyer_pk_fk" FOREIGN KEY ("buyer_id") REFERENCES "drizzle_orm"."buyer"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."buyer_session" ADD CONSTRAINT "buyer_session_buyer_id_buyer_pk_fk" FOREIGN KEY ("buyer_id") REFERENCES "drizzle_orm"."buyer"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."house_contact" ADD CONSTRAINT "house_contact_listing_id_house_listing_pk_fk" FOREIGN KEY ("listing_id") REFERENCES "drizzle_orm"."house_listing"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."house_contact" ADD CONSTRAINT "house_contact_buyer_id_buyer_pk_fk" FOREIGN KEY ("buyer_id") REFERENCES "drizzle_orm"."buyer"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."house_listing" ADD CONSTRAINT "house_listing_listed_by_seller_id_seller_pk_fk" FOREIGN KEY ("listed_by_seller_id") REFERENCES "drizzle_orm"."seller"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."house_listing" ADD CONSTRAINT "house_listing_city_id_city_pk_fk" FOREIGN KEY ("city_id") REFERENCES "drizzle_orm"."city"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."house_seen" ADD CONSTRAINT "house_seen_buyer_id_buyer_pk_fk" FOREIGN KEY ("buyer_id") REFERENCES "drizzle_orm"."buyer"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."house_seen" ADD CONSTRAINT "house_seen_listing_id_house_listing_pk_fk" FOREIGN KEY ("listing_id") REFERENCES "drizzle_orm"."house_listing"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."house_wishlist" ADD CONSTRAINT "house_wishlist_buyer_id_buyer_pk_fk" FOREIGN KEY ("buyer_id") REFERENCES "drizzle_orm"."buyer"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."house_wishlist" ADD CONSTRAINT "house_wishlist_listing_id_house_listing_pk_fk" FOREIGN KEY ("listing_id") REFERENCES "drizzle_orm"."house_listing"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."seller_key" ADD CONSTRAINT "seller_key_seller_id_seller_pk_fk" FOREIGN KEY ("seller_id") REFERENCES "drizzle_orm"."seller"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."seller_rating" ADD CONSTRAINT "seller_rating_seller_id_seller_pk_fk" FOREIGN KEY ("seller_id") REFERENCES "drizzle_orm"."seller"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."seller_rating" ADD CONSTRAINT "seller_rating_rated_by_id_buyer_pk_fk" FOREIGN KEY ("rated_by_id") REFERENCES "drizzle_orm"."buyer"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."seller_session" ADD CONSTRAINT "seller_session_seller_id_seller_pk_fk" FOREIGN KEY ("seller_id") REFERENCES "drizzle_orm"."seller"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

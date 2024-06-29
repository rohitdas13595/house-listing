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
ALTER TABLE "drizzle_orm"."house_listing" ALTER COLUMN "title" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "price" double precision DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "city_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "area" double precision DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "location" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "no_of_bedrooms" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "resale" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "maitainance_staff" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "gymnasium" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "swimming_poll" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "landscaped_garden" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "jogging_track" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "rain_water_harvesting" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "indoor_games" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "shopping_mall" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "intercom" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "sports_facility" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "atm" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "club_house" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "school" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "security_24x7" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "power_backup" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "car_parking" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "staff_quarter" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "cafeteria" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "multipurpose_room" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "hospital" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "washingmachine" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "gas_connection" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "ac" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "wifi" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "children_play_area" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "lift" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "bed" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "vaastu_compliant" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "microwave" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "golf_course" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "tv" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "dorm_table" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "sofa" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "wardobe" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "drizzle_orm"."house_listing" ADD COLUMN "refrigerator" boolean DEFAULT false NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drizzle_orm"."house_listing" ADD CONSTRAINT "house_listing_city_id_city_pk_fk" FOREIGN KEY ("city_id") REFERENCES "drizzle_orm"."city"("pk") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

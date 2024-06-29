import {
  pgSchema,
  uuid,
  varchar,
  text,
  timestamp,
  bigint,
  PgTableWithColumns,
  PgColumn,
  doublePrecision,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const schema = pgSchema("drizzle_orm");

export const AdminRole = schema.table("admin_role", {
  id: uuid("pk").primaryKey().notNull().defaultRandom(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const Admin = schema.table("admin", {
  id: uuid("pk").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 100 }).notNull(),
  adminRoleId: uuid("admin_role_id")
    .notNull()
    .references(() => AdminRole.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const AdminSession = schema.table("admin_session", {
  id: uuid("pk").primaryKey().notNull().defaultRandom(),
  adminId: uuid("admin_id")
    .notNull()
    .references(() => Admin.id),
  activeExpires: bigint("active_expires", { mode: "number" }).notNull(),
  idleExpires: bigint("idle_expires", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const AdminKey = schema.table("admin_key", {
  id: uuid("pk").primaryKey().notNull().defaultRandom(),
  hashedPassword: varchar("hashed_password", { length: 100 }).notNull(),
  adminId: uuid("admin_id")
    .notNull()
    .references(() => Admin.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

//seller

export const Seller = schema.table("seller", {
  id: uuid("pk").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  phone: varchar("phone", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const SellerSession = schema.table("seller_session", {
  id: uuid("pk").primaryKey().notNull().defaultRandom(),
  sellerId: uuid("seller_id")
    .notNull()
    .references(() => Seller.id),
  activeExpires: bigint("active_expires", { mode: "number" }).notNull(),
  idleExpires: bigint("idle_expires", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const SellerKey = schema.table("seller_key", {
  id: uuid("pk").primaryKey().notNull().defaultRandom(),
  hashedPassword: varchar("hashed_password", { length: 100 }).notNull(),
  sellerId: uuid("seller_id")
    .notNull()
    .references(() => Seller.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const SellerRating = schema.table("seller_rating", {
  id: uuid("pk").primaryKey().notNull().defaultRandom(),
  rating: bigint("rating", { mode: "number" }).notNull(),
  sellerId: uuid("seller_id")
    .notNull()
    .references(() => Seller.id),
  ratedById: uuid("rated_by_id")
    .notNull()
    .references(() => Buyer.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

//Buyer

export const Buyer = schema.table("buyer", {
  id: uuid("pk").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  phone: varchar("phone", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const BuyerSession = schema.table("buyer_session", {
  id: uuid("pk").primaryKey().notNull().defaultRandom(),
  buyerId: uuid("buyer_id")
    .notNull()
    .references(() => Buyer.id),
  activeExpires: bigint("active_expires", { mode: "number" }).notNull(),
  idleExpires: bigint("idle_expires", { mode: "number" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const BuyerKey = schema.table("buyer_key", {
  id: uuid("pk").primaryKey().notNull().defaultRandom(),
  hashedPassword: varchar("hashed_password", { length: 100 }).notNull(),
  buyerId: uuid("buyer_id")
    .notNull()
    .references(() => Buyer.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

//House listing

export const City = schema.table("city", {
  id: uuid("pk").primaryKey().notNull().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  state: varchar("state", { length: 255 }).notNull(),
  district: varchar("district", { length: 255 }).notNull(),
  pincode: varchar("pincode", { length: 12 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const HouseListing = schema.table("house_listing", {
  id: uuid("pk").primaryKey().notNull().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  listedBySellerId: uuid("listed_by_seller_id")
    .notNull()
    .references(() => Seller.id),
  price: doublePrecision("price").notNull().default(0),
  cityId: uuid("city_id")
    .references(() => City.id)
    .notNull(),
  area: doublePrecision("area").notNull().default(0),
  location: varchar("location", { length: 255 }).notNull(),
  noOfBedrooms: integer("no_of_bedrooms").notNull().default(0),
  resale: boolean("resale").notNull().default(false),
  maitainanceStaff: integer("maitainance_staff").notNull().default(0),
  gymnasium: boolean("gymnasium").notNull().default(false),
  swimmingPoll: boolean("swimming_poll").notNull().default(false),
  landscapedGarden: boolean("landscaped_garden").notNull().default(false),
  joggingTrack: boolean("jogging_track").notNull().default(false),
  rainWaterHarvesting: boolean("rain_water_harvesting")
    .notNull()
    .default(false),
  indoorGames: boolean("indoor_games").notNull().default(false),
  shoppingMall: boolean("shopping_mall").notNull().default(false),
  intercom: boolean("intercom").notNull().default(false),
  sportsFacility: boolean("sports_facility").notNull().default(false),
  atm: boolean("atm").notNull().default(false),
  clubHouse: boolean("club_house").notNull().default(false),
  school: boolean("school").notNull().default(false),
  security24x7: boolean("security_24x7").notNull().default(false),
  powerBackup: boolean("power_backup").notNull().default(false),
  carParking: boolean("car_parking").notNull().default(false),
  staffQuarter: boolean("staff_quarter").notNull().default(false),
  cafeteria: boolean("cafeteria").notNull().default(false),
  multipurposeRoom: boolean("multipurpose_room").notNull().default(false),
  hospital: boolean("hospital").notNull().default(false),
  washingmachine: boolean("washingmachine").notNull().default(false),
  gasConnection: boolean("gas_connection").notNull().default(false),
  ac: boolean("ac").notNull().default(false),
  wifi: boolean("wifi").notNull().default(false),
  childrenPlayArea: boolean("children_play_area").notNull().default(false),
  lift: boolean("lift").notNull().default(false),
  bed: integer("bed").notNull().default(0),
  vaastuCompliant: boolean("vaastu_compliant").notNull().default(false),
  microwave: boolean("microwave").notNull().default(false),
  golfCourse: boolean("golf_course").notNull().default(false),
  tv: boolean("tv").notNull().default(false),
  diningTable: boolean("dorm_table").notNull().default(false),
  sofa: integer("sofa").notNull().default(0),
  wardobe: integer("wardobe").notNull().default(0),
  refrigerator: boolean("refrigerator").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const HouseSeen = schema.table("house_seen", {
  id: uuid("pk").primaryKey().notNull().defaultRandom(),
  buyerId: uuid("buyer_id")
    .notNull()
    .references(() => Buyer.id),
  listingId: uuid("listing_id")
    .notNull()
    .references(() => HouseListing.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const HouseContact = schema.table("house_contact", {
  id: uuid("pk").primaryKey().notNull().defaultRandom(),
  listingId: uuid("listing_id")
    .notNull()
    .references(() => HouseListing.id),
  buyerId: uuid("buyer_id")
    .notNull()
    .references(() => Buyer.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const HouseWishlist = schema.table("house_wishlist", {
  id: uuid("pk").primaryKey().notNull().defaultRandom(),
  buyerId: uuid("buyer_id")
    .notNull()
    .references(() => Buyer.id),
  listingId: uuid("listing_id")
    .notNull()
    .references(() => HouseListing.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type DbTables =
  | typeof AdminRole
  | typeof Buyer
  | typeof BuyerKey
  | typeof BuyerSession
  | typeof HouseContact
  | typeof HouseListing
  | typeof HouseSeen
  | typeof HouseWishlist
  | typeof Seller
  | typeof SellerRating;

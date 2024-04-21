-- CreateTable
CREATE TABLE "medspa_address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "address_line_1" TEXT NOT NULL,
    "address_line_2" TEXT,
    "address_line_3" TEXT,
    "address_line_4" TEXT,
    "address_number" TEXT,
    "sublocality" TEXT,
    "locality" TEXT,
    "administrative_area" TEXT,
    "postal_code" TEXT NOT NULL,
    "region_code" TEXT NOT NULL,
    "medspa_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "medspa_address_medspa_id_fkey" FOREIGN KEY ("medspa_id") REFERENCES "medspa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "medspa_contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contact_type" TEXT NOT NULL,
    "contact_value" TEXT NOT NULL,
    "medspa_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    CONSTRAINT "medspa_contact_medspa_id_fkey" FOREIGN KEY ("medspa_id") REFERENCES "medspa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "medspa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME
);

-- CreateTable
CREATE TABLE "medspa_appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "medspa_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "medspa_appointment_medspa_id_fkey" FOREIGN KEY ("medspa_id") REFERENCES "medspa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "medspa_service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" REAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "medspa_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    CONSTRAINT "medspa_service_medspa_id_fkey" FOREIGN KEY ("medspa_id") REFERENCES "medspa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "medspa_appointment_on_service" (
    "medSpaServiceId" INTEGER NOT NULL,
    "medSpaAppointmentId" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,

    PRIMARY KEY ("medSpaServiceId", "medSpaAppointmentId"),
    CONSTRAINT "medspa_appointment_on_service_medSpaServiceId_fkey" FOREIGN KEY ("medSpaServiceId") REFERENCES "medspa_service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medspa_appointment_on_service_medSpaAppointmentId_fkey" FOREIGN KEY ("medSpaAppointmentId") REFERENCES "medspa_appointment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "medspa_contact_medspa_id_contact_type_contact_value_key" ON "medspa_contact"("medspa_id", "contact_type", "contact_value");

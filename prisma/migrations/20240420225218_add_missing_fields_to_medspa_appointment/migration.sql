/*
  Warnings:

  - Added the required column `start_time` to the `medspa_appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `medspa_appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_duration` to the `medspa_appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `medspa_appointment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_medspa_appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "medspa_id" INTEGER NOT NULL,
    "start_time" DATETIME NOT NULL,
    "total_duration" INTEGER NOT NULL,
    "total_price" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    CONSTRAINT "medspa_appointment_medspa_id_fkey" FOREIGN KEY ("medspa_id") REFERENCES "medspa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_medspa_appointment" ("created_at", "deletedAt", "id", "medspa_id", "updated_at") SELECT "created_at", "deletedAt", "id", "medspa_id", "updated_at" FROM "medspa_appointment";
DROP TABLE "medspa_appointment";
ALTER TABLE "new_medspa_appointment" RENAME TO "medspa_appointment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

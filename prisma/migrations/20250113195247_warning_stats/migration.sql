/*
  Warnings:

  - Added the required column `warning_overridden` to the `request_inventory_snapshots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warning_shown` to the `request_inventory_snapshots` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "request_inventory_snapshots" ADD COLUMN     "warning_overridden" BOOLEAN NOT NULL,
ADD COLUMN     "warning_shown" BOOLEAN NOT NULL;

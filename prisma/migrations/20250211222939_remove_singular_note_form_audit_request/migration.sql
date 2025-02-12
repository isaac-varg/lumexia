/*
  Warnings:

  - You are about to drop the column `note` on the `audit_requests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "audit_requests" DROP COLUMN "note";

/*
  Warnings:

  - You are about to drop the column `refresh_token` on the `accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "refresh_token",
ADD COLUMN     "refresh_tokens" TEXT;

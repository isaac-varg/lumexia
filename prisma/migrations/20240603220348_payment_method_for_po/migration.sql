/*
  Warnings:

  - Added the required column `payment_method_id` to the `purchase_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchase_orders" ADD COLUMN     "payment_method_id" TEXT NOT NULL;

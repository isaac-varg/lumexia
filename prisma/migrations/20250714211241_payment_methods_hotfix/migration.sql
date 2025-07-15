/*
  Warnings:

  - You are about to drop the column `card_name` on the `payment_methods` table. All the data in the column will be lost.
  - You are about to drop the column `ending_in` on the `payment_methods` table. All the data in the column will be lost.
  - You are about to drop the column `name_on_card` on the `payment_methods` table. All the data in the column will be lost.
  - Added the required column `associated_name` to the `payment_methods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method_name` to the `payment_methods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment_methods" DROP COLUMN "card_name",
DROP COLUMN "ending_in",
DROP COLUMN "name_on_card",
ADD COLUMN     "account_ending_in" TEXT,
ADD COLUMN     "associated_name" TEXT NOT NULL,
ADD COLUMN     "method_name" TEXT NOT NULL;

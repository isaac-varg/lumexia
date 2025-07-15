/*
  Warnings:

  - You are about to drop the column `image` on the `payment_methods` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `payment_methods` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `payment_methods` table. All the data in the column will be lost.
  - Added the required column `bg_color_a` to the `payment_methods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bg_color_b` to the `payment_methods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_name` to the `payment_methods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiry` to the `payment_methods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_on_card` to the `payment_methods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_type` to the `payment_methods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payment_methods" DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "type",
ADD COLUMN     "bg_color_a" TEXT NOT NULL,
ADD COLUMN     "bg_color_b" TEXT NOT NULL,
ADD COLUMN     "card_name" TEXT NOT NULL,
ADD COLUMN     "circle_color_a" TEXT,
ADD COLUMN     "circle_color_b" TEXT,
ADD COLUMN     "ending_in" TEXT,
ADD COLUMN     "expiry" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "name_on_card" TEXT NOT NULL,
ADD COLUMN     "payment_type" TEXT NOT NULL;

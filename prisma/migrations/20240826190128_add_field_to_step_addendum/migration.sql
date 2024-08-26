/*
  Warnings:

  - Added the required column `conten` to the `step_addendums` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "step_addendums" ADD COLUMN     "conten" TEXT NOT NULL;

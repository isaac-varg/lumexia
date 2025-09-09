-- AlterTable
ALTER TABLE "bpr_stagings" ADD COLUMN     "is_primary_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_secondary_verified" BOOLEAN NOT NULL DEFAULT false;

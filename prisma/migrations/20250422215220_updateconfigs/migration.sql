-- AlterTable
ALTER TABLE "configs" ADD COLUMN     "config_group_id" TEXT NOT NULL DEFAULT 'f8b6d7ef-672c-4751-9f08-21c7c3790136';

-- AddForeignKey
ALTER TABLE "configs" ADD CONSTRAINT "configs_config_group_id_fkey" FOREIGN KEY ("config_group_id") REFERENCES "app_config_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

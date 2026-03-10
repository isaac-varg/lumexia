-- Add record_status_id to MBPR component tables with default "active" for existing rows

-- AlterTable: batch_steps
ALTER TABLE "batch_steps" ADD COLUMN "record_status_id" TEXT;
UPDATE "batch_steps" SET "record_status_id" = 'd7b0a804-52c6-4586-b4f4-0fe49895f794';
ALTER TABLE "batch_steps" ALTER COLUMN "record_status_id" SET NOT NULL;

-- AlterTable: bill_of_materials
ALTER TABLE "bill_of_materials" ADD COLUMN "record_status_id" TEXT;
UPDATE "bill_of_materials" SET "record_status_id" = 'd7b0a804-52c6-4586-b4f4-0fe49895f794';
ALTER TABLE "bill_of_materials" ALTER COLUMN "record_status_id" SET NOT NULL;

-- AlterTable: step_actionables
ALTER TABLE "step_actionables" ADD COLUMN "record_status_id" TEXT;
UPDATE "step_actionables" SET "record_status_id" = 'd7b0a804-52c6-4586-b4f4-0fe49895f794';
ALTER TABLE "step_actionables" ALTER COLUMN "record_status_id" SET NOT NULL;

-- AlterTable: step_addendums
ALTER TABLE "step_addendums" ADD COLUMN "record_status_id" TEXT;
UPDATE "step_addendums" SET "record_status_id" = 'd7b0a804-52c6-4586-b4f4-0fe49895f794';
ALTER TABLE "step_addendums" ALTER COLUMN "record_status_id" SET NOT NULL;

-- AlterTable: step_equipment
ALTER TABLE "step_equipment" ADD COLUMN "record_status_id" TEXT;
UPDATE "step_equipment" SET "record_status_id" = 'd7b0a804-52c6-4586-b4f4-0fe49895f794';
ALTER TABLE "step_equipment" ALTER COLUMN "record_status_id" SET NOT NULL;

-- AlterTable: step_instructions
ALTER TABLE "step_instructions" ADD COLUMN "record_status_id" TEXT;
UPDATE "step_instructions" SET "record_status_id" = 'd7b0a804-52c6-4586-b4f4-0fe49895f794';
ALTER TABLE "step_instructions" ALTER COLUMN "record_status_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "batch_steps" ADD CONSTRAINT "batch_steps_record_status_id_fkey" FOREIGN KEY ("record_status_id") REFERENCES "record_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bill_of_materials" ADD CONSTRAINT "bill_of_materials_record_status_id_fkey" FOREIGN KEY ("record_status_id") REFERENCES "record_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "step_actionables" ADD CONSTRAINT "step_actionables_record_status_id_fkey" FOREIGN KEY ("record_status_id") REFERENCES "record_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "step_addendums" ADD CONSTRAINT "step_addendums_record_status_id_fkey" FOREIGN KEY ("record_status_id") REFERENCES "record_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "step_equipment" ADD CONSTRAINT "step_equipment_record_status_id_fkey" FOREIGN KEY ("record_status_id") REFERENCES "record_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "step_instructions" ADD CONSTRAINT "step_instructions_record_status_id_fkey" FOREIGN KEY ("record_status_id") REFERENCES "record_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "equipment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "step_equipment" (
    "id" TEXT NOT NULL,
    "step_id" TEXT NOT NULL,
    "equipment_id" TEXT NOT NULL,
    "foreign_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "step_equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "step_instructions" (
    "id" TEXT NOT NULL,
    "step_id" TEXT NOT NULL,
    "instruction_content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "step_instructions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "step_equipment" ADD CONSTRAINT "step_equipment_step_id_fkey" FOREIGN KEY ("step_id") REFERENCES "batch_steps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "step_equipment" ADD CONSTRAINT "step_equipment_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "step_instructions" ADD CONSTRAINT "step_instructions_step_id_fkey" FOREIGN KEY ("step_id") REFERENCES "batch_steps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

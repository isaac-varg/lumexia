-- CreateTable
CREATE TABLE "qc_template_parameters" (
    "id" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,
    "parameter_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_template_parameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qc_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_templates_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "qc_template_parameters" ADD CONSTRAINT "qc_template_parameters_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "qc_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_template_parameters" ADD CONSTRAINT "qc_template_parameters_parameter_id_fkey" FOREIGN KEY ("parameter_id") REFERENCES "qc_parameters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

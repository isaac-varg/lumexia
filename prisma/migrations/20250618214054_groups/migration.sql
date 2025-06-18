-- CreateTable
CREATE TABLE "qc_group_parameters" (
    "id" TEXT NOT NULL,
    "group_id" TEXT NOT NULL,
    "parameter_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_group_parameters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qc_parameter_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "examination_type_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "qc_parameter_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_QcParameterToQcParameterGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QcParameterToQcParameterGroup_AB_unique" ON "_QcParameterToQcParameterGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_QcParameterToQcParameterGroup_B_index" ON "_QcParameterToQcParameterGroup"("B");

-- AddForeignKey
ALTER TABLE "qc_group_parameters" ADD CONSTRAINT "qc_group_parameters_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "qc_parameter_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_group_parameters" ADD CONSTRAINT "qc_group_parameters_parameter_id_fkey" FOREIGN KEY ("parameter_id") REFERENCES "qc_parameters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_parameter_groups" ADD CONSTRAINT "qc_parameter_groups_examination_type_id_fkey" FOREIGN KEY ("examination_type_id") REFERENCES "qc_examination_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QcParameterToQcParameterGroup" ADD CONSTRAINT "_QcParameterToQcParameterGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "qc_parameters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QcParameterToQcParameterGroup" ADD CONSTRAINT "_QcParameterToQcParameterGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "qc_parameter_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

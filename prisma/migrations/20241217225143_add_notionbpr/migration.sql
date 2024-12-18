-- CreateTable
CREATE TABLE "notion_bprs" (
    "id" TEXT NOT NULL,
    "lumexia_bpr_id" TEXT NOT NULL,
    "notion_page_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notion_bprs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notion_bprs" ADD CONSTRAINT "notion_bprs_lumexia_bpr_id_fkey" FOREIGN KEY ("lumexia_bpr_id") REFERENCES "batch_production_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

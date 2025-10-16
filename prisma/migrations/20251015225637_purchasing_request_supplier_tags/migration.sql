-- CreateTable
CREATE TABLE "purchasing_request_supplier_tags" (
    "id" TEXT NOT NULL,
    "purchasing_request_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "purchasing_request_supplier_tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "purchasing_request_supplier_tags_purchasing_request_id_supp_key" ON "purchasing_request_supplier_tags"("purchasing_request_id", "supplier_id");

-- AddForeignKey
ALTER TABLE "purchasing_request_supplier_tags" ADD CONSTRAINT "purchasing_request_supplier_tags_purchasing_request_id_fkey" FOREIGN KEY ("purchasing_request_id") REFERENCES "purchasing_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchasing_request_supplier_tags" ADD CONSTRAINT "purchasing_request_supplier_tags_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

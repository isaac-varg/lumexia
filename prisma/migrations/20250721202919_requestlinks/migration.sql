-- CreateTable
CREATE TABLE "general_request_links" (
    "id" TEXT NOT NULL,
    "general_request_id" TEXT NOT NULL,
    "purchasing_request_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "general_request_links_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "general_request_links" ADD CONSTRAINT "general_request_links_general_request_id_fkey" FOREIGN KEY ("general_request_id") REFERENCES "general_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "general_request_links" ADD CONSTRAINT "general_request_links_purchasing_request_id_fkey" FOREIGN KEY ("purchasing_request_id") REFERENCES "purchasing_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

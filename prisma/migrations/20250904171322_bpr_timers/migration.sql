-- CreateTable
CREATE TABLE "bpr_timer_entries" (
    "id" TEXT NOT NULL,
    "bpr_id" TEXT NOT NULL,
    "timer_type_id" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bpr_timer_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bpr_timer_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bg_color" TEXT NOT NULL,
    "text_color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bpr_timer_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bpr_timer_entries" ADD CONSTRAINT "bpr_timer_entries_timer_type_id_fkey" FOREIGN KEY ("timer_type_id") REFERENCES "bpr_timer_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpr_timer_entries" ADD CONSTRAINT "bpr_timer_entries_bpr_id_fkey" FOREIGN KEY ("bpr_id") REFERENCES "batch_production_records"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

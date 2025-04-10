-- CreateTable
CREATE TABLE "examination_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bg_color" TEXT NOT NULL DEFAULT '#c4b5fd',
    "text_color" TEXT NOT NULL DEFAULT '#FFFFFF',
    "description" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "examination_statuses_pkey" PRIMARY KEY ("id")
);

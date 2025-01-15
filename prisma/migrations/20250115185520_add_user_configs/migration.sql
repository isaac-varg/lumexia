-- CreateTable
CREATE TABLE "user_config_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_config_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_configs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "config_group_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_configs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_configs" ADD CONSTRAINT "user_configs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_configs" ADD CONSTRAINT "user_configs_config_group_id_fkey" FOREIGN KEY ("config_group_id") REFERENCES "user_config_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

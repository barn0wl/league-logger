/*
  Warnings:

  - You are about to drop the `ddragon_version` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ddragon_version";

-- CreateTable
CREATE TABLE "app_metadata" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_metadata_pkey" PRIMARY KEY ("key")
);

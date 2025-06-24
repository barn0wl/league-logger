-- CreateTable
CREATE TABLE "ddragon_version" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "version" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ddragon_version_pkey" PRIMARY KEY ("id")
);

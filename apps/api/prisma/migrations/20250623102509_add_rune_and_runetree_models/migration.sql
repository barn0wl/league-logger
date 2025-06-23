-- CreateTable
CREATE TABLE "Rune" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "treeId" TEXT NOT NULL,

    CONSTRAINT "Rune_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuneTree" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,

    CONSTRAINT "RuneTree_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rune" ADD CONSTRAINT "Rune_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "RuneTree"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

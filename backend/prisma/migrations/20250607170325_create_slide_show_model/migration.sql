-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "isHot" BOOLEAN;

-- CreateTable
CREATE TABLE "SlideShow" (
    "id" SERIAL NOT NULL,
    "images" TEXT[],
    "createdById" INTEGER NOT NULL,
    "updatedById" INTEGER,
    "deletedById" INTEGER,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SlideShow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SlideShow_deletedAt_idx" ON "SlideShow"("deletedAt");

-- AddForeignKey
ALTER TABLE "SlideShow" ADD CONSTRAINT "SlideShow_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SlideShow" ADD CONSTRAINT "SlideShow_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SlideShow" ADD CONSTRAINT "SlideShow_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

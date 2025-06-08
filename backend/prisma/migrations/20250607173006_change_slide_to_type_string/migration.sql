/*
  Warnings:

  - You are about to drop the column `images` on the `SlideShow` table. All the data in the column will be lost.
  - Added the required column `image` to the `SlideShow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SlideShow" DROP COLUMN "images",
ADD COLUMN     "image" TEXT NOT NULL;

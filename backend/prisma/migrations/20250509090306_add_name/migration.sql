/*
  Warnings:

  - Added the required column `name` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brand" ADD COLUMN "name" VARCHAR(500) NOT NULL;
UPDATE "Brand" SET name = 'Default Name' WHERE name IS NULL;

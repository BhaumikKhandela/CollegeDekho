/*
  Warnings:

  - The `requirement` column on the `Admission` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Admission" DROP COLUMN "requirement",
ADD COLUMN     "requirement" TEXT[];

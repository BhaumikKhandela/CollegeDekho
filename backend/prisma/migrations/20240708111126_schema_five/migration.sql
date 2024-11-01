/*
  Warnings:

  - You are about to drop the column `courseId` on the `Admission` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Admission" DROP CONSTRAINT "Admission_courseId_fkey";

-- AlterTable
ALTER TABLE "Admission" DROP COLUMN "courseId";

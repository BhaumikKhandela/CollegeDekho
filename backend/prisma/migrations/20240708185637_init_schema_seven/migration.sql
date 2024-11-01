/*
  Warnings:

  - You are about to drop the column `courseId` on the `Faqs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Faqs" DROP CONSTRAINT "Faqs_courseId_fkey";

-- AlterTable
ALTER TABLE "Faqs" DROP COLUMN "courseId";

-- CreateTable
CREATE TABLE "CourseAdmission" (
    "id" SERIAL NOT NULL,
    "courseId" INTEGER NOT NULL,
    "requirement" TEXT[],

    CONSTRAINT "CourseAdmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseAdmission" ADD CONSTRAINT "CourseAdmission_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

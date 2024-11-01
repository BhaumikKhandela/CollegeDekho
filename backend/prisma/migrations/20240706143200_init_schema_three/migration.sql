/*
  Warnings:

  - Added the required column `fieldId` to the `College` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "College" ADD COLUMN     "fieldId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Field" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Placements" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "averagePackage" TEXT NOT NULL DEFAULT 'Data not available',
    "medianPackage" TEXT NOT NULL DEFAULT 'Data not available',
    "heighestPackage" TEXT NOT NULL DEFAULT 'Data not available',
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "Placements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ranking" (
    "id" SERIAL NOT NULL,
    "basedOn" TEXT NOT NULL,
    "Rank" TEXT NOT NULL DEFAULT 'Data not available',
    "collegeId" INTEGER NOT NULL,

    CONSTRAINT "Ranking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "College" ADD CONSTRAINT "College_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Placements" ADD CONSTRAINT "Placements_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ranking" ADD CONSTRAINT "Ranking_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

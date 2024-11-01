-- AlterTable
ALTER TABLE "College" ADD COLUMN     "metablogURL" TEXT DEFAULT '/college',
ADD COLUMN     "metadescription" TEXT DEFAULT 'description',
ADD COLUMN     "metakeywords" TEXT DEFAULT 'keywords',
ADD COLUMN     "metatitle" TEXT DEFAULT 'title';

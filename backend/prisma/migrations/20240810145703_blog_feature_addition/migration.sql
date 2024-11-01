-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "metatitle" TEXT NOT NULL,
    "metadescription" TEXT NOT NULL,
    "metakeywords" TEXT NOT NULL,
    "blogURL" TEXT NOT NULL,
    "htmlContent" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

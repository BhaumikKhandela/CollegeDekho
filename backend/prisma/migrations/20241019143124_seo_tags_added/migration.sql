-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "canonicalURL" TEXT,
ADD COLUMN     "lastModified" TIMESTAMP(3),
ADD COLUMN     "ogDescription" TEXT,
ADD COLUMN     "ogImage" TEXT,
ADD COLUMN     "ogLocale" TEXT,
ADD COLUMN     "ogSiteName" TEXT,
ADD COLUMN     "ogTitle" TEXT,
ADD COLUMN     "ogType" TEXT,
ADD COLUMN     "ogURL" TEXT,
ADD COLUMN     "pinterestDescription" TEXT,
ADD COLUMN     "pinterestImage" TEXT,
ADD COLUMN     "pinterestImageAltText" TEXT,
ADD COLUMN     "robots" TEXT,
ADD COLUMN     "schemaMarkup" TEXT,
ADD COLUMN     "twitterCard" TEXT,
ADD COLUMN     "twitterCreator" TEXT,
ADD COLUMN     "twitterDescription" TEXT,
ADD COLUMN     "twitterImage" TEXT,
ADD COLUMN     "twitterSite" TEXT,
ADD COLUMN     "twitterTitle" TEXT;

-- AlterTable
ALTER TABLE "College" ADD COLUMN     "canonicalURL" TEXT,
ADD COLUMN     "lastModified" TIMESTAMP(3),
ADD COLUMN     "ogDescription" TEXT,
ADD COLUMN     "ogImage" TEXT,
ADD COLUMN     "ogLocale" TEXT,
ADD COLUMN     "ogSiteName" TEXT,
ADD COLUMN     "ogTitle" TEXT,
ADD COLUMN     "ogType" TEXT,
ADD COLUMN     "ogURL" TEXT,
ADD COLUMN     "pinterestDescription" TEXT,
ADD COLUMN     "pinterestImage" TEXT,
ADD COLUMN     "pinterestImageAltText" TEXT,
ADD COLUMN     "robots" TEXT,
ADD COLUMN     "schemaMarkup" TEXT,
ADD COLUMN     "twitterCard" TEXT,
ADD COLUMN     "twitterCreator" TEXT,
ADD COLUMN     "twitterDescription" TEXT,
ADD COLUMN     "twitterImage" TEXT,
ADD COLUMN     "twitterSite" TEXT,
ADD COLUMN     "twitterTitle" TEXT;

-- CreateTable
CREATE TABLE "Pages_Meta_Tags" (
    "id" SERIAL NOT NULL,
    "page" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "ogAltImageText" TEXT,
    "ogURL" TEXT,
    "ogType" TEXT,
    "ogLocale" TEXT,
    "ogSiteName" TEXT,
    "twitterCard" TEXT,
    "twitterTitle" TEXT,
    "twitterDescription" TEXT,
    "twitterImage" TEXT,
    "twitterImageAltText" TEXT,
    "twitterSite" TEXT,
    "twitterCreator" TEXT,
    "pinterestImage" TEXT,
    "pinterestImageAltText" TEXT,
    "pinterestDescription" TEXT,
    "canonicalURL" TEXT,
    "robots" TEXT,
    "keywords" TEXT,
    "lastModified" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pages_Meta_Tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pages_Meta_Tags_page_key" ON "Pages_Meta_Tags"("page");

-- CreateIndex
CREATE UNIQUE INDEX "Pages_Meta_Tags_slug_key" ON "Pages_Meta_Tags"("slug");

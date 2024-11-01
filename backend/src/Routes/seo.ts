import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

export const SeoRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
}>();

SeoRouter.post("/pages/create", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    await prisma.pages_Meta_Tags.create({
      data: {
        page: body.page,
        slug: body.slug,
        title: body.title,
        description: body.description,
        ogTitle: body.ogTitle,
        ogDescription: body.ogDescription,
        ogImage: body.ogImage,
        ogAltImageText: body.ogAltImageText,
        ogURL: body.ogURL,
        ogType: body.ogType,
        ogLocale: body.ogLocale,
        ogSiteName: body.ogSiteName,
        twitterCard: body.twitterCard,
        twitterTitle: body.twitterTitle,
        twitterDescription: body.twitterDescription,
        twitterImage: body.twitterImage,
        twitterImageAltText: body.twitterImageAltText,
        twitterSite: body.twitterSite,
        twitterCreator: body.twitterCreator,
        pinterestImage: body.pinterestImage,
        pinterestImageAltText: body.pinterestImageAltText,
        pinterestDescription: body.pinterestDescription,
        canonicalURL: body.canonicalURL,
        robots: body.robots,
        keywords: body.keywords,
      },
    });

    return c.json({
      message: "SEO tags created successfully",
    });
  } catch (error) {
    console.error(error);

    return c.json({
      message: "An error occurred while creating seo tags",
    });
  }
});

SeoRouter.patch("/pages/update/:page", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const page = c.req.param("page");

    const existingPage = await prisma.pages_Meta_Tags.findUnique({
      where: {
        page: page,
      },
    });

    if (!existingPage) {
      return c.json({
        message: "Page not found",
      });
    }

    const { id, ...rest } = existingPage;

    const updatedData = {
      ...rest,
      ...body,
    };
    const newUpdatedData = await prisma.pages_Meta_Tags.update({
      where: {
        page: page,
      },
      data: updatedData,
    });

    return c.json({
      message: `Tags updated for ${page}`,
    });
  } catch (error) {
    console.log(error);

    return c.json({
      message: "An error occurred",
    });
  }
});

SeoRouter.get("/pages/tags", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const { page } = c.req.query();
    const tags = await prisma.pages_Meta_Tags.findUnique({
      where: {
        page: page,
      },
    });
    if (!tags) {
      return c.json({
        message: "No tags found for this page",
      });
    }
    return c.json({
      message: "Tags found for the page",
      Tags: tags,
    });
  } catch (error) {
    console.log(error);

    return c.json({
      message: "An error occurred while fetching tags",
    });
  }
});

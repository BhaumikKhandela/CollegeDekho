import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { getDefaultFormatCodeSettings } from "typescript";

export const blogRouter = new Hono<{
    Bindings:{
     DATABASE_URL: string,
     SECRET_KEY: string,
     
    }
    
}>
();
interface Field{
    name: string
    colleges: College[]
}
interface College{
    name: string,
    location: string,
    founded: string,
    description: string,
    courses: Course[],
    admission: Admission[],
    hostelFess: HostelFees[],
    faqs: Faqs[]
    ranking: Ranking[]

}
interface Course{
    name: string,
    duration: string,
    fees: number,
    seats:number,
    cutoff: number,
    faqs: Faqs[],
    admission: Admission[],
    placement: Placements[]
}

interface Admission{
    requirement: string
}
interface HostelFees{
    type: string,
    amount: number
}
interface Faqs{
    question: string
    answer: string
}
interface Ranking{
    basedOn: string
    Rank: string

}

interface Placements{
    year:number
    averagePackage: string
    medianPackage: string
    heighestPackage: string
}

interface Id{
    id: number
}
interface Faqs{
    question: string,
    answer: string
}

// blogRouter.use('/Admin/*', async(c,next)=>{
    
//     try{
//         const header = c.req.header('authorization')||'';
//         if(!header){
//             return c.json({
//                 msg: "authorization header missing"
//             })
//         }
//        const token = header.split(' ')[1];
       
//         const response = await verify(token,c.env.SECRET_KEY);
//         if(!(response.role === "Admin")){
//             return c.json({
//                 msg: "Incorrect token"
//             })
//         }
//         await next();
//     }catch(error){
//         console.log(error);
//         return c.json({
//             msg: "Token verification failed"
//         })
//        }
       
//     }
// );



blogRouter.use('/:id', async(c,next)=>{
 try{
    const header = c.req.header("authorization") || "";
    if(!header){
        return c.json({
            msg: "Authorization header missing"
        })
    }
    const token = header.split(' ')[1];
    if(!token){
        return c.json({
            msg: "Token missing"
        });
    }
    const response = await verify(token,c.env.SECRET_KEY);
    await next();
 }
 catch(error){
    console.log(error);
    return c.json({
        msg:"Token verification failed",error
    })
 }
});

blogRouter.post('/Admin/create/college/:id', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
        const ids = parseInt(c.req.param('id'));
        const body = await c.req.json();
        console.log(body);
        const college = await prisma.college.create({
            data:{
                name: body.name,
                founded: body.founded,
                description: body.description,
                location: body.location,
                state: body.state,
                city: body.city,
                fieldId: ids,
                metadescription: body.metadescription,
                metakeywords: body.metakeywords,
                metatitle: body.metatitle,
                metablogURL: body.metablogURL

            }
        });
        const admission = await prisma.admission.create({
            data:{
                requirement: body.requirement,
                collegeId: college.id
            }
        })
        

        

        const rank = await prisma.ranking.create({
            data:{
                basedOn: body.basedOn,
                Rank: body.rank,
                collegeId: college.id
            }
        });

        const faq = await prisma.college.update({
            where:{
                id: college.id
            },data:{
                faqs:{
                    create: body.faqs.map((faq:Faqs)=>({
                        question: faq.question,
                        answer: faq.answer
                    }))
                }
            }
        });

        const foundCollege = await prisma.college.findFirst({
            where:{
                id: college.id
            },select:{
                faqs: true
            }
        })
            
        return c.json({
            msg: "College created successfully",
            id: college.id
        
        })
    }catch(error){
        console.log(error);
        return c.json({
            msg: "An error occured while creating college",error
        })
    }
});

blogRouter.post('/Admin/create/blog', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());


    try{

        const body = await c.req.json();
        const blog = await prisma.blog.create({
            data:{
                title: body.title,
                author: body.author,
                metatitle: body.metatitle,
                metadescription: body.metadescription,
                metakeywords: body.metakeywords,
                htmlContent: body.htmlContent,
                published: body.published,
                blogURL: body.blogURL
            }
        });
        return c.json({
            msg: "Blog created successfully"
        });
    } catch(error){
        console.error("An error occurred while creating blog : ",error);
        return c.json({
            msg: "Blog can't be created"
        })
    }
});

blogRouter.get('/Admin/latest-blogs', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
       const blogs = await prisma.blog.findMany({
        where:{
            published: true
        },
       orderBy: {
        created: "desc"
       },
       take: 5
       });

       return c.json({
        LatestBlogs : blogs
       });

    } catch(error){
        console.error("Can't get the Latest Blogs", error);
        return c.json({
            msg: "Couldn't get te Latest Blogs",
            LatestBlogs: []
        });
    }
});

blogRouter.get('/Admin/search/:blogTitle', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
        const blogTitle = c.req.param('blogTitle');
        if(!blogTitle){
            const blogs = await prisma.blog.findMany({
                orderBy:{
                    created: 'desc'
                }
            });

            return c.json({
                searchedBlogs: blogs
            })
        }else{

        const blogs = await prisma.blog.findMany({
            where:{
            title:{
                contains: blogTitle,
                mode: 'insensitive'
            }
            }
        });
        return c.json({
            searchedBlogs: blogs
        });
    }
    } catch(error){
        console.error("An error occurred while finding blogs", error);
        return c.json({
            searchedBlogs: []
        });
    }
});

blogRouter.get('/Admin/normal-search/:blogTitle', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const blogTitle = c.req.param('blogTitle');
        const searchedBlogs = await prisma.blog.findMany({
            where:{
                title: {
                    contains: blogTitle,
                    mode: 'insensitive'
                }
            },
            select:{
                id: true,
                title: true,

            }
        });
        return c.json({
            blogs : searchedBlogs
        });
    }catch(error){
        console.error("An error occured while searching for blogs in database",error);
        return c.json({
            blogs: []
        })
    }
});
// blogRouter.get('/Admin/allBlogs', async(c) => {
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL
//     }).$extends(withAccelerate());

//     try{
//         const allblogs = await prisma.blog.findMany({
//             orderBy:{
//                 created: 'desc'
//             }
//         });
//         return c.json({
//             msg: "All blogs which have been created till now can be seen",
//             blogs: allblogs
//         });
//     } catch(error){
//         console.error("Couldn't get all the blogs", error);
//         return c.json({
//             msg: "Couldn't fetch all the blogs",
//             blogs: []
//         });
//     }
// });


blogRouter.get('/pagination/articles', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
     let page = Number(c.req.query('page')) || 1;
     let limit =  Number(c.req.query('limit')) || 3;
     let skip = (page -1) * limit

     const blogs = await prisma.blog.findMany({
        where:{
            published: true
        },
        orderBy: {
            created: 'desc'
        },
        take: limit,
        skip: skip 
     });
     return c.json({
        page,
        limit,
        data: blogs
     });
    }catch(error){
        console.error("An error occurred while fetching blogs", error);
        return c.json({
            data: []
        })
    }
})

blogRouter.patch('/Admin/blog/edit/published/:id' , async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const body = await c.req.json();
        const ids = parseInt(c.req.param('id'));
        const updatePublish = await prisma.blog.update({
            where:{
            id: ids
            },
            data:{
                published: body.published
            }
        });
        if(updatePublish.published === true){
            return c.json({
                msg: "Blog published successfully"
            });
        }else{
            return c.json({
                msg: "The blog has been successfully removed"
            })
        }
        
    } catch(error){
        console.error("An error occured while publishing the blog", error);
        return c.json({
            msg: "An error occurred while publishing the blog"
        })
    }
});





blogRouter.post('/Admin/create/course/:collegeId', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const body = await c.req.json();

        const ids = parseInt(c.req.param('collegeId'));

        const courseCreated = await prisma.college.update({
            where:{
                id : ids
            },data:{
                courses:{
                    create: body.courses.map((course:any)=>({
                        name: course.name,
                        duration: course.duration,
                        fees: course.fees,
                        seats: course.seats,
                        cutoff: course.cutoff,
                        placement: {
                            create: course.placements.map((placement:any)=>({
                                year: placement.year,
                                averagePackage: placement.averagePackage,
                                medianPackage: placement.medianPackage,
                                heighestPackage: placement.heighestPackage
                            }))
                        },
                        admission: {
                            create: {
                                requirement: course.admission
                            }
                        }
                    }))
                },
            }
        })
        const course = await prisma.course.findMany({
            where:{
                collegeId: ids
            },select:{
                admission: true
            }
        })
        console.log(course);
        return c.json({
            msg: "Courses created successfully",
            data: course
        })
    }catch(error){
        console.log(error);
        return c.json({
            msg: "Mapping failed",error
        });
    }
});

blogRouter.patch('/Admin/update-meta/:fieldId/:collegeId', async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const body = await c.req.json();
        const collegeId = parseInt(c.req.param('collegeId'));
        const fieldId = parseInt(c.req.param('fieldId'));

        const meta = await prisma.college.update({
            where: {
                fieldId: fieldId,
                id: collegeId
            },
            data:{
                metatitle: body.metatitle,
                metadescription: body.metadescription,
                metakeywords: body.metakeywords,
                metablogURL: body.metablogURL
            }
        });

        console.log(meta);
        return c.json({
            msg: "meta tags updated sucessfully",
            Meta: meta
        })
    }catch(error){
        console.error("An error occurred while updating the meta tags",error);

        return c.json({
            msg: "An error occurred while updating the meta tags",
            err: error
        });
    }
});

blogRouter.get("/Admin/find-colleges/:fieldId", async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const fieldid = parseInt(c.req.param('fieldId'));
        const colleges = await prisma.college.findMany({
            where:{
                fieldId: fieldid
            },orderBy:{
                name: 'asc'
            },select:{
                id: true,
                name: true
            }
        })

        return c.json({
            msg: "colleges found",
            college: colleges
            
        })
    }catch(error){
        console.error(error);
        return c.json({
            msg: "couldn't fetch the colleges"
        })
    }
})



blogRouter.get('/random-blogs/:field', async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const fieldName = c.req.param('field');
        const blogs = await prisma.field.findMany({
            where:{
                name: fieldName
            },
            select:{
                colleges:{
                    select:{
                        id: true,
                        name: true,
                        location: true,
                        founded: true,
                        ranking: true
                    }
                }
                   

                
            },
            take: 10
        });
         return c.json({
            msg: "Colleges found",
            data: blogs
         })
    }catch(error){
        console.log(error);
        return c.json({
            msg: "An error accured while fetching colleges"
        })
    }

});



blogRouter.get('/bulk/:field', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
        const fieldName = c.req.param('field') + "";
        const blogs = await prisma.field.findMany({
            where:{
                name: fieldName
            },
            select:{
                colleges:{
                    select:{
                        id: true,
                        name: true,
                        location: true,
                        founded: true,
                        ranking: true,
                        
                    }
                }
                   

                
            }
        });
        console.log(blogs);
        console.log(blogs);
        if(blogs[0].colleges.length === 0){
            const blogArr = [
                {
                    colleges: [
                        {
                            id: -1,
                            name: "",
                            location: "",
                            founded: "",
                            ranking: []
                        }]}]
            return c.json({
                data: blogArr
            });
        }else{
            return c.json({
                msg: `All ${fieldName} colleges`,
                data: blogs
            });
        }
        
        
    }catch(error){
        console.log(error)
        return c.json({
            msg: `Couldn't fetch all the colleges`,error,
            data: []
        })
    }
});


blogRouter.get('college-blog/:field/:collegeName/:id', async(c)=>{
    const prisma = new PrismaClient({
     datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
        const field = c.req.param('field');
        const collegeName = c.req.param('collegeName');
        const ids = parseInt(c.req.param('id')) || 1;

        const blog = await prisma.field.findMany({
            where:{
                name: field,
                
            },select:{
                
                colleges:{
                   where:{
                    id: ids,
                    name:{
                        equals: collegeName,
                        mode: 'insensitive'
                           
                        
                    }
                   },
                   select:{
                    name: true,
                    ownership: true,
                    founded: true,
                    description: true,
                    logo: true,
                    image: true,
                    collegeWebsiteLink: true,
                    location: true,
                    courses: true,
                    admission: true,
                    hostelFess: true,
                    ranking: true,
                    faqs: true,
                    field: true,
                    metablogURL: true,
                    metadescription: true,
                    metakeywords: true,
                    metatitle: true

                   }
                }
            }
        });
        console.log(blog);
      if(blog.length === 0){
        return c.json({
            msg: "blog doesnot exist"
        })
      }
      
      return c.json({
        msg: "College found",
        data: blog
      })
    }catch(error){
      console.log(error);
      return c.json({
        msg: "College not found",
        data: []
      })
    }
});

blogRouter.get('/search/college/:collegeName', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
        const collegeName = c.req.param('collegeName');
        const searchedCollege = await prisma.college.findMany({
            where:{
                name:{
                    contains: collegeName,
                    mode: 'insensitive'
                    }
                    
            },
            select:{
                id: true,
                name: true,
                location: true,
                founded: true,
                ranking: true,
                description: true,
                courses: true
            }
        })
        

        return c.json({
           
            msg: searchedCollege
        })
    }catch(error){
        console.log(error);
        return c.json({
            msg: []
        })
    }
});

blogRouter.post('/filter/colleges/:fieldName', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const body = await c.req.json();
        const fieldName = c.req.param('fieldName');

        const colleges = await prisma.field.findMany({
            where:{
                name: fieldName,
                colleges:{
                    some:{
                        location:{
                            in: body.locations
                        },
                        courses:{
                            some:{
                                name:{
                                    in: body.courses
                                }
                            }
                        },
                        ownership:{
                            in: body.ownership
                        }
                    }
                }
            }
        })
       console.log(colleges);
       if(colleges.length === 0){
       const collegesArr = [
            {
                colleges: [
                    {
                        id: -1,
                        name: "",
                        location: "",
                        founded: "",
                        ranking: []
                    }]}]
                    return c.json({
                        data: collegesArr
                        });
       }else{
        const collegesArr = colleges
        return c.json({
            data: collegesArr
            });
       }
        
    }catch(error){
        console.error(error);
        return c.json({
            data: []
        })
    }
});


blogRouter.get('/search/college-course-article/:searchedWord', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
        const searchedWord = c.req.param('searchedWord');
        const searchedCollege = await prisma.college.findMany({
            where:{
                name:{
                    contains: searchedWord,
                    mode: 'insensitive'
                    }
                    
            },
            select:{
                id: true,
                name: true,
                field: true
            },
            take: 4
        });

        const searchedCourses = await prisma.course.findMany({
            where:{
                name:{
                    contains: searchedWord,
                    mode: 'insensitive'
                }
            },
            select:{
                id: true,
                name: true
            },
            take: 1
        });

        const searchedArticle = await prisma.blog.findMany({
            where:{
                title:{
                    contains: searchedWord,
                    mode: 'insensitive'
                }
            },
            select:{
                id: true,
                title: true
            },
            take: 5
        });

        
        

        return c.json({
           colleges: searchedCollege,
           courses: searchedCourses,
           articles: searchedArticle
            
        })
    }catch(error){
       
        return c.json({
            colleges: [],
            courses: [],
            articles: []
        })
    }
});

blogRouter.get('/search/course/:courseName', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    });
    try{
        const courseName = c.req.param('courseName')
        const searchedCourse = await prisma.college.findMany({
            where:{
               courses:{
                some:{
                    name: courseName,
                    
                }
               }

            },select:{
                id: true,
                name: true,
                location:true,
                founded: true,
                description: true,
                ranking: true,
                
            }
            
        })
        if(!searchedCourse){
            return c.json({

                msg: "No such course or college found"
            })
        }
        return c.json({
            msg: "Colleges found which offer this course",
            data: searchedCourse
        })

    }catch(error){
        console.log(error);
        return c.json({
            msg: "An error occurred while searching for collges which offer this course",
            error
        })
    }
});

// blogRouter.put('/Admin/update-placements/:field/:collegeId/:courseId', async(c)=>{
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL
//     }).$extends(withAccelerate());
//     try{
//         const body = await c.req.json();
//         const fieldName = c.req.param('field');
//         const collegeId = parseInt(c.req.param('collegeId'));
//         const courseId = parseInt(c.req.param('courseId'));
        
//         const fieldArray = await prisma.field.findMany({
//             where:{
//                 name: fieldName,
//                 colleges:{
//                     some:{
//                         id: collegeId,
//                         courses:{
//                             some:{
//                                 id: courseId,
                                
//                             }
//                         }
//                     }
//                 }
//             },select:{
//                 colleges:{
//                     select:{
//                         courses:{
//                             select:{
//                                 placement:{
//                                     select:{
//                                         id: true
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         });
    
//         if(!fieldArray || fieldArray.length === 0){
//             return c.json({
//                 msg: "Couldn't find the college or course"
//             })
//         }

//         const placementIds:any[]=[];
        
//         fieldArray.map(field=> field.colleges.courses.placement.map((placements:any)=>
//             placements.id
//         ))
        

//   for(let i=0; i<placementIds.length;i++){
//     await prisma.placements.update({
//         where:{
//             id: placementIds[i]
//         },data:{
//           year:  body.year[i],
//           averagePackage: `${body.averagePackage[i]}`,
//           medianPackage: `${body.medianPackage[i]}`,
//           heighestPackage: `${body.heighestPackage[i]}`
//         }
//     })
//   }
// }catch(error){
//     console.log(error);
//     return c.json({
//         msg: "An error occurred while updating",error
//     })
// }})


blogRouter.get('/Admin/course/:collegeId', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const ids = parseInt(c.req.param('collegeId'));

        const course = await prisma.course.findMany({
            where:{
                collegeId: ids
            },select:{
                id: true,
                name: true,
               

            }
        })

        return c.json({
            msg: "All courses offered by college",
            data: course
        })


    }catch(error){
        console.log(error);
        return c.json({
            msg: "Courses not found",error

        })
    }
})
// blogRouter.get('/Admin/update-placements/:field/:collegeId/:courseId', async(c)=>{
//     const prisma = new PrismaClient({
//         datasourceUrl: c.env.DATABASE_URL
//     }).$extends(withAccelerate());
//     try{
//         const body = await c.req.json();
//         const fieldName = c.req.param('field');
//         const collegeId = parseInt(c.req.param('collegeId'));
//         const courseId = parseInt(c.req.param('courseId'));
        
//         const fieldArray = await prisma.field.findMany({
//             where:{
//                 name: fieldName,
//                 colleges:{
//                     some:{
//                         id: collegeId,
//                         courses:{
//                             some:{
//                                 id: courseId,
                                
//                             }
//                         }
//                     }
//                 }
//             },include:{
//                 colleges:true
//             }
//         });
    
//        return c.json({
//         msg: "placement ids found",
//         data: fieldArray
//        })
// }catch(error){
//     console.log(error);
//     return c.json({
//         msg: "An error occurred while updating",error
//     })
// }})


blogRouter.get('/article/:id', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL   
    }).$extends(withAccelerate());

    try{
        const id = parseInt(c.req.param('id'));
        const article = await prisma.blog.findFirst({
            where:{
                id: id
            }
        });

        return c.json({
            msg: "Article found sucessflly",
            blog: article
        })
    }catch(error){
        console.log(error);
        return c.json({
            msg: "An error occurred while fetching the article",
            blog: []
        });
    }
});

blogRouter.get('/random/articles', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
    
       
         const randomRecords = await prisma.$queryRaw`SELECT id, title, "blogURL" FROM "Blog" ORDER BY RANDOM() LIMIT 5`;

         return c.json({
            blogs: randomRecords
         })
        
    }catch(error){
        console.error(error);
        return c.json({
            blogs: {}
        })
    }
});

blogRouter.get('/locations-courses-ownership/filter/:field', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());


    try{

        const fieldName = parseInt(c.req.param('field'));
        const uniqueState = await prisma.field.findMany({
            where:{
                id: fieldName,
                
            },
            select:{
                colleges:{
                   distinct: ['state'],
                    select:{
                        state: true
                    }
                }
            }
        });
        const uniqueCity =  await prisma.field.findMany({
            where:{
                id: fieldName,
                
            },
            select:{
                colleges:{
                    
                    distinct: ['city'],
                    select:{
                        city: true
                    }
                }
            }
        });
        const distinctCourses = await prisma.course.findMany({
            where: {
              college: {
                fieldId: fieldName,  
              },
            },
            distinct: ['name'],  
            select: {
              name: true,
            },
          });
          
        if(uniqueCity.length == 0 && uniqueState.length==0){
          return c.json({
            location: uniqueCity,
            courses: distinctCourses,
            msg: "state and city arrays are empty"
          });
        }
        const uniqueStateArray =  uniqueState[0].colleges.map((d)=>(d.state)).filter((d)=>(d ? d : ''));
        
        const uniqueCityArray = uniqueCity[0].colleges.map((d)=>(d.city)).filter((d)=>(d ? d : ''));

        const locationArray = [...uniqueStateArray,...uniqueCityArray];
   
         const locationArrayObject = locationArray.map((d)=>({name: d}))

       

        return c.json({
            location: locationArrayObject,
            courses: distinctCourses
        });
    }catch(error){
        console.error(error);

        return c.json({
            location: [],
            msg: "An error occurred "
        });
    }
});

blogRouter.post('/filter/location-courses-ownership-available/:field', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const body = await c.req.json();
        const fieldName = parseInt(c.req.param('field'));

        
        const collegesList = await prisma.college.findMany({
            where:{
               fieldId: fieldName,
               ownership: body.ownership.length > 0 ? {in: body.ownership} : undefined,
               OR: body.locations.length > 0 ? [
                {
                    state: {in: body.locations}
                },
                {
                    city: {in: body.locations}
                }
               ] : undefined,
               courses: body.courses.length > 0 ? {
                some:{
                    name: {in: body.courses}
                }
               } : undefined
            },
        });

        return c.json({
            colleges: collegesList
        });

    }catch(error){
        console.error(error);

        return c.json({
            colleges: [],
            msg: "An error occurred"
        })
    }
});


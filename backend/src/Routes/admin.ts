import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";

import bcrypt from 'bcryptjs';
import { jwt, sign } from "hono/jwt";

export const adminRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        SECRET_KEY: string
    }
}>
();

adminRouter.post('/signupsecret', async(c)=>{
   const prisma = new PrismaClient({
datasourceUrl: c.env.DATABASE_URL
   }).$extends(withAccelerate());
   try{
    const body = await c.req.json();

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const admin = await prisma.admin.create({
        data:{
         username: body.username,
         password: hashedPassword       
        }
    })
    
    return c.json({
        msg: "User created successfully"
    });
   }
   catch(e){
    console.log(e);
   return c.json({
    msg: "Couldn't create the user admin"
   });
   
   }
});
adminRouter.post('/login', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
        const body = await c.req.json();
        const user = await prisma.admin.findFirst({
            where:{
               username: body.username
            }
        });
        if(!user){
            return c.json({
                msg: "incorrect email or password"
            });

        }
        const isPasswordValid = await bcrypt.compare(body.password,user.password);
        if(!isPasswordValid){
            return c.json({
                msg: "incorrect email or password"
            });
        }
        const token = sign({username: body.username,role:"Admin"}, c.env.SECRET_KEY);
        return c.json({
            msg: token
        });
    }
    catch(error){
        console.log(error);
        return c.json({
            msg: "An error occured while logging in"
        })
    }
});



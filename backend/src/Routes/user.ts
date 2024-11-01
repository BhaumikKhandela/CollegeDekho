import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import bcrypt from 'bcryptjs'
import { sign, verify } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
export const userRouter = new Hono<{
Bindings: {
    DATABASE_URL: string,
    SECRET_KEY: string
}
}>();

userRouter.post('/signup', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    });
   
    try{
        const body = await c.req.json();
      
        const state = body.state.label;
        const city = body.city.value;
        const hashedPassword = await bcrypt.hash(body.password,10);
        const user = await prisma.user.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                username: body.username,
                password: hashedPassword,
                mobileNumber: body.mobileNumber,
                city: city,
                state: state,
                interestedIn: body.interestedIn
            }
        })


        const token = await sign({username: body.username, role:"user"},c.env.SECRET_KEY);
        console.log(token);
        return c.json({
            msg: "User created successfully",
            generatedToken: token
        });
    }catch(error){
        console.log(error);
        return c.json({
            msg: "An error occurred in creating user"
        })
    }
});


userRouter.post('/signin', async(c)=>{
   const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
   })
   try{
    const body = await c.req.json();
    const hashedPassword = body.password;
    const user = await prisma.user.findFirst({
        where:{
            username : body.username
        }
    });
    if(!user){
        return c.json({
            msg:"incorrect username or password"
        });
    }
    const isPasswordValid = bcrypt.compare(body.password,user.password);
    if(!isPasswordValid){
        return c.json({
            msg: "incorrect username or password"
        })
    }
    const token = sign({username: body.username, role:"user"}, c.env.SECRET_KEY);
    return c.json({
        msg: "Logged in successfully",
        token: token
    });
   } catch(error){
    console.log(error);
    c.json({
        msg:"An error occured while sigging in"
    });
   }
});
userRouter.get('/findUser', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
       const body = await c.req.json();
       const userFound = await prisma.user.findFirstOrThrow({
        where:{
            id: parseInt(body.Id)
        },select:{
            firstName: true,
            lastName:  true,
            interestedIn: true
        }
       });
       return c.json({
        msg: "username unavailable",
        data: userFound
       });
    }catch(error){
        console.log(error);
        return c.json({
            msg: "username available"
        })
    }
});

userRouter.post('/newsletter', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    })
    try{
        const body = await c.req.json();

        const email = await prisma.email.create({
            data:{
                email: body.email
            }
        });

        return c.json({
            msg: "Your email added to newsletter list successfully"
        })

    }catch(error){
        console.log(error);
        return c.json({
            msg: "An error occurred while filling email"
        })
    }
});
userRouter.post('/logged-in', async(c)=>{
    try{
        const header = c.req.header("authorization") || "";
        if(!header){
            return c.json({
                msg: "Authorization header missing"
            })
        }
        const token = header.split(' ')[1];
        const response = await verify(token,c.env.SECRET_KEY);
        return c.json({
            msg: "Token is verified"
        })
    }catch(error){
        console.log(error);
        return c.json({
            msg:"Token verification failed",error
        })
    }
    })

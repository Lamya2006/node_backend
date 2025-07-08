const express = require("express")
const app = express()
const mongoose = require("mongoose");
app.use(express.json())
const userRoutes = require("./src/routes/userRoutes");
const employeeRoute = require("./src/routes/employeeRoute")

const productRoutes = require("./src/routes/productRoutes");

const studentRoutes = require("./src/routes/studentRoute")
const uploadRoutes = require("./src/routes/uploadRoute")
const studentController = require("./src/controller/studentController")
const cron = require("node-cron")
const {Queue} = require("bullmq")
const Redis = require("ioredis")
const http = require("http")
const server = http.createServer(app)
const {Server} = require("socket.io")


const io = new Server(server,{
  cors:{
      origin:"*",
      methods:['GET','POST']
  }
})

io.on("connection",(socekt)=>{
  console.log(`user connected with id =${socekt.id}`)

  socekt.on("sendMessage",(data)=>{
    console.log(data)
  })

})

app.use("/employee", employeeRoute)

app.use("/user", userRoutes);

app.use("/product", productRoutes);
app.use("/student", studentRoutes)
app.use("/upload", uploadRoutes)



mongoose
  .connect("mongodb://127.0.0.1/lamya")
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });


const redisConnection = new Redis(
  "rediss://red-cujm3nt2ng1s73b92o1g:L7RB5dQeIHEPOURTniYt21LJscQBO2wO@oregon-keyvalue.render.com:6379" 
)


const myQueue = new Queue("taskQueue",{connection:redisConnection})

app.post("/add-post",async (req,res)=>{
  const {user,delay} = req.body
  console.log(user)
  await myQueue.add("taskQueue",{user},{delay:delay||0})
  res.json({success:true,message:"taks has successfully added in the Quene"})
})

// const s = [{  
//   name: "1",
//   email: "1@gmail.com",
//   password:"123"
// },
// {
//   name: "2",
//   email: "2@gmail.com",
//   password:"123"
// },
// {
//   name: "3",
//   email: "3@gmail.com",
//   password:"123"
// },
// {
//   name: "4",
//   email: "4@gmail.com",
//   password:"123"
// },
// {
//   name: "5",
//   email: "5@gmail.com",
//   password:"123"
// },
// {
//   name: "6",
//   email: "6@gmail.com",
//   password:"123"
// },
// {
//   name: "7",
//   email: "7@gmail.com",
//   password:"123"
// },
// {
//   name: "8",
//   email: "8@gmail.com",
//   password:"123"
// },
// {
//   name: "9",
//   email: "9@gmail.com",
//   password:"123"
// },
// {
//   name: "10",
//   email: "10@gmail.com",
//   password:"123"
// }
// ]
// cron.schedule("* * * * *", async () => {
//   console.log("Adding students...");
//   await studentController.createStudent(s);
// });

// cron.schedule("* * * * *", async()=>{
//   console.log("-----------------------")
//   console.log("delete cron")
//   console.log("-----------------------")
//   await studentController.deleteAfter5min();
// })

// app.get("/test",(req,res)=>{
//     console.log("test api");
//     res.send("ok")

// })

// const user =[
//     {
//         id:123,
//         name:"rahual",
//         age:"23"
//     },
//     {
//         id:124,
//         name:"rahi",
//         age:"23"
//     },
//     {
//         id:132,
//         name:"raya",
//         age:"23"
//     }

// ]
// app.get("/user",(req,res)=>{
//     res.json({
//         message:"information of user",
//         data:user
//     })

// })

// app.get("/user/:id",(res,req)=>{
//     const id = req.params.id
//     const founduser = user.find((users)=>users.id==id)
//     if(founduser)
//     {
//         res.json({
//             message:"user fetch",
//             data:founduser
//         })
//     }
// })

const CACHE_EXPIRY =60;

const cacheMiddleware = async (req,res ,next)=>{
  const {userId} = req.params;
  try{
    
    const cacheData = await redisConnection.get(userId)
    if(cacheData)
    {
      console.log("cache hit")
      return res.json(JSON.parse(cacheData));
    }
    else
    {
      console.log("cache miss")
      next()
    }
  }catch(err)
  {
    console.error("Redis error",err)
    next()
  }
 
}

const fakeData = {
  1: { name: "John", age: 23 },
  2: { name: "Doe", age: 24 },
  3: { name: "Jane", age: 25 },
  4:{name:"Harsh",age:23},
  5:{name:"Lamya",age:25}
};

app.get("/user/:userId",cacheMiddleware,(req,res)=>{
  const {userId} = req.params
  const userData = fakeData[userId];
  redisConnection.setex(userId, CACHE_EXPIRY,JSON.stringify(userData))
  return res.json(userData)
})





const PORT = 3000
app.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);

})
const {Worker, Job} = require("bullmq")
const Redis = require("ioredis")
const mail = require("./src/util/mail")

const redisConnect = new Redis(
    "rediss://red-cujm3nt2ng1s73b92o1g:L7RB5dQeIHEPOURTniYt21LJscQBO2wO@oregon-keyvalue.render.com:6379",
    {maxRetriesPerRequest : null}
)

// const worker = new Worker(
//     "taskQueue",
//     async (job)=>{
//         console.log(`${job.name} is in process`)
//         await new Promise((resolve)=>setTimeout(resolve,1000))
//         console.log(`${job.name} successfully completed`)
//     }
// ) 

const worker = new Worker(
    "taskQueue",
    async (job)=>{
        console.log("sending email to ",job.data.user)

        mail.sendingMail(job.data.user,"welcome","hello")

    },{connection:redisConnect}
)


worker.on("completed",(job)=>{
    console.log(`job ${job.id} is completed`)
})

worker.on("failed",(job,err)=>{
    console.log(`job has not been completed due to error ${err.message}`)
})
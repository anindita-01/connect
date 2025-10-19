import express from 'express'

const app = express();
const PORT= 3000;

app.get('/', (req,res)=>{
    res.send("Hello World!!")
})
app.get('/api/auth/signup', (req,res)=>{
    res.send("Signup")
})

app.listen(PORT, ()=>{
    console.log(`Server is walking on port ${PORT}`)
})

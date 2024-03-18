import express from 'express'
import pokeRouter from './router/pokemon.js';


const app = express();

const port = process.env.PORT || 3000


app.get('/',(req, res)=>{

  
  res.send('Welcome')
})

app.use('/pokemon', pokeRouter)




app.listen(port ,(req, res)=>{
  console.log('server is running');
})
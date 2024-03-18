import express from 'express';
import Pokemon from '../api/poke.js';

const router = express.Router();


router.get('/:id', async(req, res)=>{
  const id = req.params.id
  
  const pokemon = new Pokemon(id);

  
  const info = {
    name : await pokemon.name,
    type : await pokemon.type
  }

  res.send(info);
})

export default router
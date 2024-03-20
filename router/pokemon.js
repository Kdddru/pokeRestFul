import express from 'express';
import Pokemon from '../api/poke.js';

const router = express.Router();


router.get('/:id', async(req, res)=>{
  const param = req.params.id
  
  const pokemon = new Pokemon(param);

  const { name, type, basicInfo, ability } = pokemon;

  const {id, weight, height} = await basicInfo

  
  const info = {
    id : id,
    name : await name,
    type : await type,
    weight : weight,
    height : height,
    ability : await ability
  }

  res.send(info);
})

export default router
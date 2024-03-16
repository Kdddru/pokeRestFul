
const getUrl = async (parm) =>{
  const url = `https://pokeapi.co/api/v2/pokemon/${parm}`

  const response = await fetch(url);
  const json = await response.json();

  const name_url = json.species.url

  const types_url = json.types.map(( {type} )=> type.url);

  return { name_url, types_url }
}

getUrl(1)


const getName = async()=>{
  const { name_url } = await getUrl(1);
  
  console.log(name_url);
}


getName();




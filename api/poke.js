
// const getUrl = async (param) =>{
//   const url = `https://pokeapi.co/api/v2/pokemon/${param}`

  // const response = await fetch(url);
  // const json = await response.json();

  // const name_url = json.species.url

  // const types_url = json.types.map(( {type} )=> type.url);

  // return { name_url, types_url }
// }

// getUrl(1)


// const getName = async()=>{
//   const { name_url } = await getUrl(1);
  
//   console.log(name_url);
// }


// getName();

class Urls {
  
  constructor(param){
    this.urls = this.getUrl(param);
    
  }
  async getUrl(id){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    const response = await fetch(url);
    const json = await response.json();
  
    const name_url = json.species.url
  
    const types_url = json.types.map(( {type} )=> type.url);
  
    

    return  { name_url, types_url}
  }
}


class Pokemon extends Urls {

  constructor(param){
    //Urls class에게 
    super(param)

    this.name = this.getName();
    this.type = this.getType();


  }

  async getName(){
    const {name_url} =  await this.urls

    const response = await fetch(name_url);
    const json = await response.json();

    const name = json.names.find(({language} )=> language.name === "ko" ).name
    
    return name
  }

  async getType(){
    const {types_url} = await this.urls

    const fetch_Data = types_url.map((url)=> fetch(url))

    const type = await Promise.all(fetch_Data)
    .then((response)=> Promise.all(response.map((res)=>res.json())))
    .then((result)=>result.map(({names})=>{
      const name = names.find(({language})=> language.name === "ko").name

      return name
    }))
    
    return type
  }
}


async function a(){
  const pokemon = new Pokemon(1);
  

  console.log(pokemon);

  


}


a();
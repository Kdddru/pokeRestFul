
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


// urls
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

    const ability_url = json.abilities.map(({ability} )=> ability.url)
  
    

    return  { url, name_url, types_url, ability_url }
  }
}


export default class Pokemon extends Urls {

  constructor(param){
    //Urls class에게 
    super(param)


    this.basicInfo = this.getBasicInfo();
    this.name = this.getName();
    this.type = this.getType();
    this.ability = this.getAbility();

  }
  //한국어 이름
  async getName(){
    const {name_url} =  await this.urls

    const response = await fetch(name_url);
    const json = await response.json();

    const name = json.names.find(( {language} )=> language.name === "ko" ).name
    
    return name
  }

  //기본 데이터
  async getBasicInfo(){
    const {url} = await this.urls

    const response = await fetch(url);
    const json = await response.json();

    const { id, weight, height } = json
    
    
    
    return { id, weight ,height}
  }

  //타입
  async getType(){
    const {types_url} = await this.urls

    const fetch_Data = types_url.map((url)=> fetch(url))

    const type = await Promise.all(fetch_Data)
    .then((response)=> Promise.all(response.map((res)=>res.json())))
    .then((result)=>result.map(( {names} )=>{
      const name = names.find(( {language} )=> language.name === "ko").name

      return name
    }))
    
    return type
  }

  async getAbility(){
    const {ability_url} = await this.urls

    const fetch_Data = ability_url.map((u)=>fetch(u));

    const name = await Promise.all(fetch_Data)
    .then((response)=>Promise.all(response.map((res)=>res.json())))
    .then((result)=>result.map(({names, flavor_text_entries})=>{
      const korean_name = names.find(( {language} )=> language.name === "ko").name
      const Korean_flavor_text_entries = flavor_text_entries.find(( {language} )=> language.name === "ko").flavor_text

      return({
        name : korean_name,
        text : Korean_flavor_text_entries
      })
    }))

    return name
  }
}









//url 테스트
async function a(){
  const url = new Urls(1);

  const prop = await url["urls"]

  console.log(prop);

  // for(let element in pokemon){
  //   const prop = await pokemon[element];
  //   console.log(prop);
  // }


}

// 데이터 테스트
async function b(){
  const pokemon =new Pokemon(1)

 

}


 b();
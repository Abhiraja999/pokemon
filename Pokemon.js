// full image of pokemon

import React, {useEffect,useState} from "react";
import {Typography,Link,CircularProgress,Button} from "@material-ui/core";
import {toFirstCharUppercase} from "./Constants";
import axios from "axios";


const Pokemon = (props) =>{
  const {history,match}= props;
  const {params}= match;
  const {pokemonId}= params;
  const[pokemon,setPokemon] = useState(undefined);
  
  
  //function fetching data
  
  useEffect(()=> {
    
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);
  
  
  // pokemon information
  
  const generatePokemonJSX = ()=> {
    
    const{name,id,species,height,weight,types,sprites} = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const {front_default} = sprites;
    return(
      <>
      <Typography variant="h1">
      {`${id}.`}{toFirstCharUppercase(name)}
      <img src ={front_default}/>  {/* small side image*/}
      </Typography>
      <img style={{width:"300px" , height:"300px"}} src={fullImageUrl}/>
       <Typography variant="h2">Pokemon Information</Typography>
        <Typography>
        {"Species:"}
        <Link href={species.url}>{species.name}</Link>
         </Typography>
        <Typography> Height: {height}</Typography>
        <Typography> Weight: {weight}</Typography>
        <Typography variant="h5"> Type: </Typography>
        {types.map((typeInfo) =>{
        const {type}=typeInfo;
        const {name}=type;
        return <Typography key={name}>{`${name}`}</Typography>;
        })}
        
    </>
    )
    
  };
 return (
  <>
      {/* showing pokemon*/}
    {pokemon === undefined && <CircularProgress/>}
    {pokemon !== undefined && pokemon && generatePokemonJSX()}
    {pokemon === false && <Typography> Pokemon not found </Typography>}
  
  
        {pokemon !== undefined && (
        <Button variant="contained" onClick={() => history.push("/")}>
          back to pokedex
        </Button>
        )}
  
  </>
  
  
 );
};
export default Pokemon;
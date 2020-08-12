// Card showing           coder Abhiraja :)
import React, {useState,useEffect} from "react";
import {AppBar,
        Toolbar,
        Grid,
        Card,
        CardContent,
        CardMedia,
        CircularProgress,
        Typography,
         
        } from "@material-ui/core";
        
import {makeStyles} from "@material-ui/core/styles";
import mockData from "./mockData";
import {toFirstCharUppercase} from "./Constants";
import axios from "axios";

// page css
const useStyles = makeStyles({
    pokedexContainer:{
        paddingTop: '20px',
        paddingLeft:'50px',
        paddingRight: '50px',
    },
    cardMedia:{
        margin:'auto',
        
    },
    cardContent:{
        textAlign: "center",
    },
    });



const Pokedex = (props) =>{
    const {history} = props;
    const classes = useStyles();
    const [pokemonData, setPokemonData]=useState({});

    // fetching API
    useEffect(()=>{
              
          axios
          .get('https://pokeapi.co/api/v2/pokemon?limit=807') //last number of pokemon is 807
          .then(function (response){
            const {data} = response;
            const {results}=data;
            const newPokemonData={};
            results.forEach((pokemon,index)=>{
{/*update state*/}  newPokemonData[index+1]={
                    id: index+1,
                    name: pokemon.name,
                    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
                };
                
                });
          
                setPokemonData(newPokemonData);
          
          
            
          });
              
    },[]);
    


    
// pokemon cadr function

const getPokemonCard = (pokemonId)=>{
    console.log(pokemonData[`${pokemonId}`]);
    const {id,name,sprite}= pokemonData[pokemonId];
   
    return(
    <Grid item xs={4} key={pokemonId}> {/*using grid system*/}
    
    
    <Card onClick={()=> history.push(`/${pokemonId}`)}>
    <CardMedia
            className ={classes.cardMedia}
            image={sprite}
            style= {{width:"130px" , height : "130px"}}
            />
           <CardContent className= {classes.cardContent}>
           < Typography> {`${id}. ${toFirstCharUppercase(name)}`}  </ Typography>
           </CardContent>
    </Card>
    </Grid>
    );
};

    // showing cards
    return (
            <>
            <AppBar position= "static">
            <Toolbar/>
            </AppBar>
            {pokemonData ? (
            
            <Grid container spacing={2} className = {classes.pokedexContainer}>
            {Object.keys(pokemonData).map(pokemonId => getPokemonCard(pokemonId)
                                          
                                          )}
            </Grid>
                            ):
            
            ( <CircularProgress/>)}
            
            </>
            );
};
export default Pokedex;
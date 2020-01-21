import React, {useEffect, useState} from "react";
import Recipe from "./Recipies";
import "./Recipe.css"

const Application = () => {
    const APP_ID = '23d57b7e';
    const APP_KEY = 'fc9197305a11bee25b5544ed0515b770';
    const [recipies, setRecipies] = useState([]);
    const [search, setSearch]= useState('');
    const [query,setQuery] = useState('chicken');

    useEffect( ()=> {
        getRecipies();
    },[query]);
    const getRecipies = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        const data = await response.json();
        setRecipies(data.hits);
        console.log(data.hits);
       

    }
    const updateSearch = e =>{
        setSearch(e.target.value);
    }
    const getSearch = e =>{
        e.preventDefault();
        setQuery(search);
        setSearch('');
    }

    return (
        <div className="Application">
            <form onSubmit={getSearch} className="search-form">
                <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
                <button className="search-button" type="submit">Search</button>
            </form>
            <div className="recipes">
            {recipies.map(recipe =>(
                <Recipe 
                key={recipe.recipe.label}
                title={recipe.recipe.label} 
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
                />
            ))}
        


            
        </div>
        </div>
    )
}


export default Application;
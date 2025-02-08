import React, {useState, useEffect} from "react";
import { apiGet } from "../utils/api";
import "./PokemonCard.css";
import TYPE_COLORS from "../utils/typeColors";

function PokemonCard({ pokemonName }) {
    const [pokemon, setPokemon] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPokemon() {
            setIsLoading(true);
            const pokemonData = await apiGet(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            setPokemon(pokemonData);
            setIsLoading(false);
        };

        fetchPokemon();
    }, [pokemonName]);

    return (
        <div className="card">
            {isLoading ? (
                <div className="text-center my-3">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Načítám...</span>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <img src={pokemon.sprites.front_default} className="card-img-top" alt="" />
                    <div className="card-body">
                        <h4 className="card-title text-center text-uppercase fw-bold">{pokemon.name}</h4>

                        {pokemon.types.map((type) => {
                            return (
                                <span
                                    key={type.type.name}
                                    className="badge text-white me-1"
                                    style={{ backgroundColor: TYPE_COLORS[type.type.name]}}
                                >
                                    {type.type.name}
                                </span>
                            );
                        })}

                        <p className="card-text">
                            <small className="fw-bold">Weight: {pokemon.weight}</small><br/>
                            <small className="fw-bold">Height: {pokemon.height}</small><br/>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PokemonCard;


import React, { useState, useEffect } from "react";
import { apiGet } from "../utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css"
import PokemonCard from "./PokemonCard";
import "./PokemonList.css";

function PokemonList() {
    const [data, setData] = useState({ pokemons: [], nextUrl: "", previousUrl: "" });
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/?offset=15&limit=15");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPokemon, setSelectedPokemon] = useState('bulbasaur');

    useEffect(() => {
        async function fetchPokemons() {
            setIsLoading(true);
            const data = await apiGet(url);
            setData({
                pokemons: data.results,
                nextUrl: data.next,
                previousUrl: data.previous,
            });
            setIsLoading(false);
        };

        fetchPokemons();
    }, [url]);

    function handleNavigationClick(url) {
        if (!url) return;
        setUrl(url);
    }

    return (
        <div className="main-container d-flex flex-column">
            <div className="container text-center my-3 d-flex justify-content-between align-items-center bg-">
                <i className="bi bi-tencent-qq fs-1 fw-bold">api</i>
                <div className="buttons">
                    <button
                        type="button"
                        className="btn btn-primary me-1"
                        onClick={() => handleNavigationClick(data.previousUrl)}>
                        Previous
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleNavigationClick(data.nextUrl)}>
                        Next
                    </button>
                </div>
            </div>
            <hr />
            <div className="container my-4">
                <div className="row pokemon-data">
                    <div className="col pokemon-list">
                        {isLoading ? (
                            <div className="text-center my-3">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Načítám...</span>
                                </div>
                            </div>
                        ) : (
                            <ul className="list-group">
                                {data.pokemons.map((pokemon) => (
                                    <li
                                        key={pokemon.name}
                                        onClick={() => setSelectedPokemon(pokemon.name)}
                                        style={{ cursor: 'pointer' }}
                                        className="link-primary list-group-item d-flex justify-content-between align-items-center fw-bold">
                                        {pokemon.name}
                                        <span className="badge text-bg-primary rounded-pill">{pokemon.url.split('/')[6]}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {selectedPokemon && (
                        <div className="col">
                            <PokemonCard pokemonName={selectedPokemon} />
                        </div>
                    )}
                </div>
            </div>
            <hr />
            <div className="container footer d-flex justify-content-between pb-5 h-auto">
                <span className="text-white">Copyright &copy; 2025 by Pokemons</span>
                <span className="text-white">Officially connected to <a href="https://pokeapi.co/"> pokeAPI</a></span>
            </div>
        </div>
    );
}

export default PokemonList;
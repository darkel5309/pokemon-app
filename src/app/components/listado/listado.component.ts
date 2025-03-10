import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {

  private _pokemonService: PokemonService;
  public pokemons: Pokemon[] = [];
  public filteredPokemons: Pokemon[] = [];
  public nextPage: string = "";
  public prevPage: string = "";
  public searchQuery: string = "";

  constructor(pokemonService: PokemonService) {
    this._pokemonService = pokemonService;
  }

  public ngOnInit(): void {
    this._pokemonService.getAllPokemon().subscribe(
      (data: any) => {
        let { next, previous, results } = data;
        this.pokemons = results;
        this.filteredPokemons = this.pokemons;
        this.nextPage = next;
        this.prevPage = previous;
      }
    );
  }

  // Buscar un pokémon
  public buscarPokemon(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query)
    );
  }

  // Página siguiente
  public next(): void {
    this._pokemonService.getAllPokemon(this.nextPage).subscribe(
      (data: any) => {
        let { next, previous, results } = data;
        this.pokemons = results;
        this.filteredPokemons = this.pokemons;
        this.nextPage = next;
        this.prevPage = previous;
      }
    );
  }

  // Página anterior
  public prev(): void {
    this._pokemonService.getAllPokemon(this.prevPage).subscribe(
      (data: any) => {
        let { next, previous, results } = data;
        this.pokemons = results;
        this.filteredPokemons = this.pokemons;
        this.nextPage = next;
        this.prevPage = previous;
      }
    );
  }

  // Obtener imagen pokémon
  public getImagenPokemon(pokemon: Pokemon): string {
    const urlImage = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
    const urlSplitted = pokemon.url.split("/");
    const id = urlSplitted[urlSplitted.length - 2];

    return urlImage + "/" + id + ".png";
  }

  // Obtener URL detalles
  public getUrlDetallesPokemon(pokemon: Pokemon): string {
    const urlSplitted = pokemon.url.split("/");
    return "/detail/" + urlSplitted[urlSplitted.length - 2];
  }
}

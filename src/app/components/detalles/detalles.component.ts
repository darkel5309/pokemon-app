import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Detalles } from '../../models/detalles';
import { Movimiento } from '../../models/movimiento';
import { MovimientoService } from '../../services/movimiento.service';
import { Tipo } from '../../models/tipo';
import { TipoService } from '../../services/tipo.service';
import { Habilidad } from '../../models/habilidad';
import { HabilidadService } from '../../services/habilidad.service';
import { EspecieService } from '../../services/especie.service';
import { Especie } from '../../models/especie';
import { EstadisticaService } from '../../services/estadistica.service';
import { Estadistica } from '../../models/estadistica';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})

export class DetallesComponent implements OnInit {

  private _location: Location;
  private _pokemonService: PokemonService;
  private _moveService: MovimientoService;
  private _typeService: TipoService;
  private _abilityService: HabilidadService;
  private _specieService: EspecieService;
  private _statsService: EstadisticaService;
  private _route: ActivatedRoute;
  public pokemon: Detalles | null = null;
  public moves: Movimiento[] = [];
  public types: Tipo[] = [];
  public abilities: Habilidad[] = [];
  public specie: Especie | null = null;
  public stats: Estadistica | null = null;
  public id: number = 0;
  public cries: string = "";

  constructor(location: Location, pokemonService: PokemonService, route: ActivatedRoute, moveService: MovimientoService, typeService: TipoService, abilityService: HabilidadService, specieService: EspecieService, statsService: EstadisticaService) {
    this._pokemonService = pokemonService;
    this._route = route;
    this._location = location;
    this._moveService = moveService;
    this._typeService = typeService;
    this._abilityService = abilityService;
    this._specieService = specieService;
    this._statsService = statsService;
  }

  public ngOnInit(): void {
    let idParam = this._route.snapshot.paramMap.get("id");
    if (idParam) {
      this.id = Number(idParam);
    }

    if (this.id) {
      this._pokemonService.getDetail(this.id).subscribe(
        (data: any) => {
          this.pokemon = data;
          this.cries = data.cries.legacy;

          // Obtener estadísticas
          this._statsService.getEstadisticas(this.id).subscribe(
            (data: any) => {
              this.stats = new Estadistica(data.stats[0].base_stat, data.stats[1].base_stat, data.stats[2].base_stat, data.stats[3].base_stat, data.stats[4].base_stat, data.stats[5].base_stat);
            }
          );
        }
      );

      //Obtener datos de la especie
      if (this.pokemon?.species != null) {
        this._specieService.getDetail(this.pokemon.species.url).subscribe(
          (data: any) => {
            const specie: Especie = data;
            specie.name = this.getNameByLanguage(data.names, 'es');
            specie.desc = this.getDescByLanguage(data.flavor_text_entries, 'es');
            specie.isLegend = data.is_legendary;
            specie.isSingular = data.is_mythical;
            this.specie = specie;
          }
        );
      }

      //Obtener las habilidades
      this.pokemon?.abilities.forEach(
        (data: any) => {
          this._abilityService.getDetail(data.ability.url).subscribe(
            (data: any) => {
              const ability: Habilidad = data;
              ability.name = this.getNameByLanguage(data.names, 'es');
              ability.desc = this.getDescByLanguage(data.flavor_text_entries, 'es');
              this.abilities.push(ability);
            }
          );

        }
      );

      //Obtener los tipos
      this.pokemon?.types.forEach(
        (data: any) => {
          this._typeService.getDetail(data.type.url).subscribe(
            (data: any) => {
              const type: Tipo = data;
              type.name = this.getNameByLanguage(data.names, 'es');
              type.image = this.getTypeImageById(type.id);
              this.types.push(type);
            }
          )

        }
      );

      //Obtener los movimientos
      this.pokemon?.moves.forEach(
        (data: any) => {
          this._moveService.getDetail(data.move.url).subscribe(
            (data: any) => {
              const move: Movimiento = data;
              move.name = this.getNameByLanguage(data.names, 'es');
              move.desc = this.getDescByLanguage(data.flavor_text_entries, 'es');
              this.moves.push(move);
            }
          )
        }
      );
    }

  }

  getTypeImageById(id: number): string {
    const urlImageType = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iii/xd/";

    return urlImageType + id + ".png";
  }

  //Traduccion del nombre del movimiento al español
  getNameByLanguage(names: string[], language: string): string {
    let result = "";
    names.forEach((name: any) => {
      if (name.language.name == language) {
        result = name.name;
      }
    });
    return result;
  }

  //Traduccion del efecto del movimiento al español
  getDescByLanguage(names: string[], language: string): string {
    let result = "";
    names.forEach((flavor_text: any) => {
      if (flavor_text.language.name == language) {
        result = flavor_text.flavor_text;
      }
    });
    return result;
  }

  goBack(): void {
    this._location.back();
  }

  goPrev(): string {
    return "/detail/" + (this.id - 1);
  }

  goNext(): string {
    return "/detail/" + (this.id + 1);
  }

  getImagenPokemon(pokemonDetail: Detalles, shiny: boolean = false) {
    let urlImage: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
    if (shiny) {
      urlImage += "shiny/"
    }
    return urlImage + pokemonDetail?.id + ".png";
  }

  playAudio(audio: HTMLAudioElement): void {
    audio.play();
  }

  pauseAudio(audio: HTMLAudioElement): void {
    audio.pause();
  }

  stopAudio(audio: HTMLAudioElement): void {
    audio.pause();
    audio.currentTime = 0;
  }
}

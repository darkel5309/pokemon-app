import { Especie } from "./especie";
import { Estadistica } from "./estadistica";
import { Habilidad } from "./habilidad";
import { Movimiento } from "./movimiento";
import { Tipo } from "./tipo";


export class Detalles {
  private _id: number;
  private _name: string;
  private _weight: string;
  private _height: string;
  private _image: string;
  private _types: Tipo[];
  private _moves: Movimiento[];
  private _abilities: Habilidad[];
  private _species: Especie;
  private _estadistica: Estadistica[];

  constructor(id: number, name: string, weight: string, height: string, image: string, types: Tipo[], moves: Movimiento[], abilities: Habilidad[], species: Especie, estadistica: Estadistica[]) {
    this._name = name;
    this._id = id;
    this._weight = weight;
    this._height = height;
    this._image = image;
    this._types = types;
    this._moves = moves;
    this._abilities = abilities;
    this._species = species;
    this._estadistica = estadistica;
  }

  public get id(): number { return this._id; }
  public set id(value: number) { this._id = value; }
  public get name(): string { return this._name; }
  public set name(value: string) { this._name = value; }
  public get weight(): string { return this._weight; }
  public set weight(value: string) { this._weight = value; }
  public get height(): string { return this._height; }
  public set height(value: string) { this._height = value; }
  public get image(): string { return this._image; }
  public set image(value: string) { this._image = value; }
  public get types(): Tipo[] { return this._types; }
  public set types(value: Tipo[]) { this._types = value; }
  public get moves(): Movimiento[] { return this._moves; }
  public set moves(value: Movimiento[]) { this._moves = value; }
  public get abilities(): Habilidad[] { return this._abilities; }
  public set abilities(value: Habilidad[]) { this._abilities = value; }
  public get species(): Especie { return this._species; }
  public set species(value: Especie) { this._species = value; }
  public get estadistica(): Estadistica[] { return this._estadistica; }
  public set estadistica(value: Estadistica[]) { this._estadistica = value; }
}

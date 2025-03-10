import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estadistica } from '../models/estadistica';

@Injectable({
  providedIn: 'root'
})
export class EstadisticaService {

  private _httpClient: HttpClient;
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(httpClient: HttpClient) {
    this._httpClient = httpClient;
  }

  public getEstadisticas(id: number): Observable<Estadistica> {
    return this._httpClient.get<Estadistica>(`${this.apiUrl}${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Artist } from '../models/artist.model';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private http: HttpClient) {}

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${environment.api}/artists/all`);
  }

  getArtist(id: string): Observable<Artist> {
    return this.http.get<Artist>(`${environment.api}/artist/${id}`);
  }

  addArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(`${environment.api}/artist`, artist);
  }

  updateArtist(id: string, artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${environment.api}/artist/${id}`, artist);
  }

  deleteArtist(id: string): Observable<Artist> {
    return this.http.delete<Artist>(`${environment.api}/artist/${id}`);
  }
}

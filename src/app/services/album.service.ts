import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from '../models/album.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private http: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${environment.api}/albums/all`);
  }

  getAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(`${environment.api}/album/${id}`);
  }

  addAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(`${environment.api}/album`, album);
  }

  updateAlbum(id: string, album: Album): Observable<Album> {
    return this.http.put<Album>(`${environment.api}/album/${id}`, album);
  }

  deleteAlbum(id: string): Observable<Album> {
    return this.http.delete<Album>(`${environment.api}/album/${id}`);
  }
}

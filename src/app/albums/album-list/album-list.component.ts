import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from 'src/app/models/album.model';
import { Artist } from 'src/app/models/artist.model';
import { AlbumService } from '../../services/album.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ArtistService } from '../../services/artist.service';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css'],
})
export class AlbumListComponent implements OnInit, OnDestroy {
  albums: Album[] = [];
  albumsFiltered: Album[] = [];
  artists: Artist[] = [];
  subscription: Subscription;

  constructor(
    private albumService: AlbumService,
    private artistService: ArtistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.albumService
      .getAlbums()
      .pipe(
        switchMap((albums) => {
          this.albums = albums;
          this.albumsFiltered = albums;
          return this.artistService.getArtists();
        })
      )
      .subscribe(
        (artists) => {
          this.artists = artists;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getArtistById(id: string): string {
    const artistName = this.artists.find((a) => a._id === id);
    return artistName ? artistName.name : 'Unknown';
  }

  onClick(id: string): void {
    this.router.navigate(['/album', id]);
  }

  onCreateAlbum(): void {
    this.router.navigate(['/album', 'new']);
  }

  onFilter(filterValue: string): void {
    this.albumsFiltered = this.albums.filter((a) =>
      a.title.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

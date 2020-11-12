import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistService } from 'src/app/services/artist.service';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
})
export class ArtistListComponent implements OnInit {
  artists: Artist[] = [];

  constructor(private artistService: ArtistService, private router: Router) {}

  ngOnInit(): void {
    this.artistService.getArtists().subscribe(
      (res) => {
        this.artists = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onClick(id: string): void {
    this.router.navigate(['/artist', id]);
  }

  onCreateArtist(): void {
    this.router.navigate(['/artist', 'new']);
  }
}

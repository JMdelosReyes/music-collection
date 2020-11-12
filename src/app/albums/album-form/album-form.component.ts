import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Artist } from '../../models/artist.model';
import { ArtistService } from '../../services/artist.service';
import { AlbumService } from '../../services/album.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Album } from 'src/app/models/album.model';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { AlertDialogComponent } from '../../shared/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css'],
})
export class AlbumFormComponent implements OnInit, OnDestroy {
  id: string;
  editMode = false;
  album: Album;
  albumForm: FormGroup;
  artists: Artist[] = [];
  subscription: Subscription;

  constructor(
    private artistService: ArtistService,
    private albumService: AlbumService,
    private router: Router,
    private route: ActivatedRoute,
    public alertDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.params
      .pipe(
        map((params: Params) => params.id),
        switchMap((id) => {
          this.id = id;
          this.editMode = this.id != null;
          if (this.editMode) {
            return this.albumService.getAlbum(this.id).pipe(
              switchMap((album) => {
                this.album = album;
                return this.artistService.getArtists();
              })
            );
          } else {
            return this.artistService.getArtists();
          }
        })
      )
      .subscribe(
        (res) => {
          this.artists = res;
          this.initForm();
        },
        (error) => {
          this.router.navigate(['/albums']);
        }
      );
  }

  initForm(): void {
    let albumTitle = '';
    let artist = '';
    let albumGenre = '';
    let albumYear = 2020;
    let albumCover = '';
    if (this.editMode) {
      albumTitle = this.album.title;
      artist = this.album.artistId;
      albumGenre = this.album.genre;
      albumYear = this.album.year;
      albumCover = this.album.coverUrl;
    }

    const reg = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

    this.albumForm = new FormGroup({
      title: new FormControl(albumTitle, Validators.required),
      artistId: new FormControl(artist),
      genre: new FormControl(albumGenre),
      year: new FormControl(albumYear, [
        Validators.min(1909),
        Validators.max(2030),
      ]),
      coverUrl: new FormControl(albumCover, [
        Validators.required,
        Validators.pattern(reg),
      ]),
    });
  }

  onSubmit(): void {
    if (this.albumForm.valid) {
      if (!this.albumForm.value.artistId || this.albumForm.value.artistId === '') {
        this.albumForm.value.artistId = null;
      }
      if (this.editMode) {
        this.albumService.updateAlbum(this.id, this.albumForm.value).subscribe(
          (res) => this.router.navigate(['/albums']),
          (error) => {
            this.alertDialog.open(AlertDialogComponent, {
              width: '250px',
              data: {
                title: 'Error',
                message: error.error.error || 'Something went wrong',
              },
            });
          }
        );
      } else {
        this.albumService.addAlbum(this.albumForm.value).subscribe(
          (res) => this.router.navigate(['/albums']),
          (error) => {
            this.alertDialog.open(AlertDialogComponent, {
              width: '250px',
              data: {
                title: 'Error',
                message: error.error.error || 'Something went wrong',
              },
            });
          }
        );
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/albums']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

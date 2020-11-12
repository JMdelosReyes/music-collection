import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AlbumService } from 'src/app/services/album.service';
import { ArtistService } from 'src/app/services/artist.service';
import { Album } from '../../models/album.model';
import { Artist } from '../../models/artist.model';
import { of, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-album-display',
  templateUrl: './album-display.component.html',
  styleUrls: ['./album-display.component.css'],
})
export class AlbumDisplayComponent implements OnInit, OnDestroy {
  id: string;
  album: Album;
  artist: Artist;
  albumSubscription: Subscription;
  deleteSubscription: Subscription;

  constructor(
    private albumService: AlbumService,
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router,
    public confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.albumSubscription = this.route.params
      .pipe(
        map((params: Params) => params.id),
        switchMap((id) => {
          this.id = id;
          return this.albumService.getAlbum(this.id);
        }),
        switchMap((album) => {
          this.album = album;
          if (this.album.artistId) {
            return this.artistService.getArtist(this.album.artistId);
          } else {
            return of(null);
          }
        })
      )
      .subscribe(
        (artist) => {
          if (artist != null) {
            this.artist = artist;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onEdit(): void {
    this.router.navigate(['/album', 'edit', this.id]);
  }

  onDelete(): void {
    this.albumService.deleteAlbum(this.id).subscribe(
      (_) => this.router.navigate(['/albums']),
      (error) => console.log(error)
    );
  }

  onShowDialog(): void {
    this.confirmDialog
      .open(ConfirmDialogComponent, {
        width: '250px',
        data: { title: 'Delete album', message: 'Are you sure?' },
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.onDelete();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.albumSubscription) {
      this.albumSubscription.unsubscribe();
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }
}

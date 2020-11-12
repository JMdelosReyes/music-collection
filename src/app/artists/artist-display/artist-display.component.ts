import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ArtistService } from 'src/app/services/artist.service';
import { Artist } from '../../models/artist.model';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-artist-display',
  templateUrl: './artist-display.component.html',
  styleUrls: ['./artist-display.component.css'],
})
export class ArtistDisplayComponent implements OnInit, OnDestroy {
  id: string;
  artist: Artist;
  artistSubscription: Subscription;

  constructor(
    private artistService: ArtistService,
    private route: ActivatedRoute,
    private router: Router,
    public confirmDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.artistSubscription = this.route.params
      .pipe(
        map((params: Params) => params.id),
        switchMap((id) => {
          this.id = id;
          return this.artistService.getArtist(this.id);
        })
      )
      .subscribe(
        (artist) => (this.artist = artist),
        (error) => console.log(error)
      );
  }

  onEdit(): void {
    this.router.navigate(['/artist', 'edit', this.id]);
  }

  onDelete(): void {
    this.artistService.deleteArtist(this.id).subscribe(
      (_) => this.router.navigate(['/artists']),
      (error) => console.log(error)
    );
  }

  onShowDialog(): void {
    this.confirmDialog
      .open(ConfirmDialogComponent, {
        width: '250px',
        data: { title: 'Delete artist', message: 'Are you sure?' },
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.onDelete();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.artistSubscription) {
      this.artistSubscription.unsubscribe();
    }
  }
}

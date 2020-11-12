import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ArtistService } from 'src/app/services/artist.service';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { Artist } from '../../models/artist.model';

@Component({
  selector: 'app-artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.css'],
})
export class ArtistFormComponent implements OnInit, OnDestroy {
  id: string;
  editMode = false;
  artist: Artist;
  artistForm: FormGroup;
  subscription: Subscription;

  constructor(
    private artistService: ArtistService,
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
            return this.artistService.getArtist(this.id);
          } else {
            return of(null);
          }
        })
      )
      .subscribe(
        (artist) => {
          if (artist !== null) {
            this.artist = artist;
          }
          this.initForm();
        },
        (error) => console.log(error)
      );
  }

  initForm(): void {
    let name = '';
    let photoUrl = '';
    let birthDate = new Date();
    let deathDate = new Date();
    if (this.editMode) {
      name = this.artist.name;
      photoUrl = this.artist.photoUrl;
      birthDate = this.artist.birthdate;
      deathDate = this.artist.deathDate;
    }

    const reg = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

    this.artistForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      photoUrl: new FormControl(photoUrl, [
        Validators.required,
        Validators.pattern(reg),
      ]),
      birthdate: new FormControl(birthDate),
      deathDate: new FormControl(deathDate),
    });
  }

  onSubmit(): void {
    if (this.artistForm.valid) {
      if (this.editMode) {
        this.artistService
          .updateArtist(this.id, this.artistForm.value)
          .subscribe(
            (res) => this.router.navigate(['/artists']),
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
        this.artistService.addArtist(this.artistForm.value).subscribe(
          (res) => this.router.navigate(['/artists']),
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
    this.router.navigate(['/artists']);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

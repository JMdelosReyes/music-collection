import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MainNavComponent } from './shared/main-nav/main-nav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlbumListComponent } from './albums/album-list/album-list.component';
import { AlbumDisplayComponent } from './albums/album-display/album-display.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { AlbumFormComponent } from './albums/album-form/album-form.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { ArtistListComponent } from './artists/artist-list/artist-list.component';
import { ArtistDisplayComponent } from './artists/artist-display/artist-display.component';
import { ArtistFormComponent } from './artists/artist-form/artist-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AlertDialogComponent } from './shared/alert-dialog/alert-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    AlbumListComponent,
    AlbumDisplayComponent,
    AlbumFormComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    ArtistListComponent,
    ArtistDisplayComponent,
    ArtistFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

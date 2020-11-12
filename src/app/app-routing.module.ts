import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumListComponent } from './albums/album-list/album-list.component';
import { AlbumDisplayComponent } from './albums/album-display/album-display.component';
import { AlbumFormComponent } from './albums/album-form/album-form.component';
import { ArtistListComponent } from './artists/artist-list/artist-list.component';
import { ArtistDisplayComponent } from './artists/artist-display/artist-display.component';
import { ArtistFormComponent } from './artists/artist-form/artist-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'albums', pathMatch: 'full'  },
  { path: 'albums', component: AlbumListComponent },
  { path: 'album/new', component: AlbumFormComponent },
  { path: 'album/edit/:id', component: AlbumFormComponent },
  { path: 'album/:id', component: AlbumDisplayComponent },
  { path: 'artists', component: ArtistListComponent },
  { path: 'artist/new', component: ArtistFormComponent },
  { path: 'artist/edit/:id', component: ArtistFormComponent },
  { path: 'artist/:id', component: ArtistDisplayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

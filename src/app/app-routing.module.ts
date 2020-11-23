import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArtistComponent } from './pages/artist/artist.component';
import { ArtistsComponent } from './pages/artists/artists.component';

const routes: Routes = [
  { path:'' ,pathMatch:'full', redirectTo:'artists'},
  { path:'artists' , component: ArtistsComponent},
  { path:'artist/:id' , component: ArtistComponent},
  { path:'**' ,pathMatch:'full', redirectTo:'artists'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

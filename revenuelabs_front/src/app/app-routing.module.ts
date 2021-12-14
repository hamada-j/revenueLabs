import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CivilizationComponent } from './civilization/civilization.component';
 import { HomeComponent } from './home/home.component';
import { LoginGuard } from './login.guard';
import { AllCivilizationsComponent } from './profile/all-civilizations/all-civilizations.component';
import { FavoriteCivilizationComponent } from './profile/favorite-civilization/favorite-civilization.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'civilization/:id', component: CivilizationComponent},
  { path: 'all_favorite_civilizations', component: AllCivilizationsComponent, canActivate: [LoginGuard]},
  { path: "all_favorite_civilizations/:id/:favorite", component: FavoriteCivilizationComponent, canActivate: [LoginGuard]},
  { path: '**', redirectTo: '/' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

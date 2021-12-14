// Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';


// Components
import { HomeComponent } from './home/home.component';
import { UniqueUnitComponent } from './modules/unique-unit/unique-unit.component';
import { CivilizationComponent } from './civilization/civilization.component';
import { CreateInComponent } from './modules/create-in/create-in.component';
import { UniqueTechComponent } from './modules/unique-tech/unique-tech.component';
import { DevelopsInComponent } from './modules/develops-in/develops-in.component';
import { AppliesToComponent } from './modules/applies-to/applies-to.component';
import { AllCivilizationsComponent } from './profile/all-civilizations/all-civilizations.component';
import { FavoriteCivilizationComponent } from './profile/favorite-civilization/favorite-civilization.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UniqueUnitComponent,
    CivilizationComponent,
    CreateInComponent,
    UniqueTechComponent,
    DevelopsInComponent,
    AppliesToComponent,
    AllCivilizationsComponent,
    FavoriteCivilizationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatGridListModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

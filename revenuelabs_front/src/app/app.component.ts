import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from './service/api.service';
import * as moment from "moment";
import { MatDrawer } from '@angular/material/sidenav';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'revenueLabs';

  user: string;
  welcome: string;
  session: number;

  showLogin: boolean = false;
  showRegister: boolean = false;
  login: boolean = false;

  favoriteCivilizations: Array<string>;

  form: FormGroup;
  @ViewChild('drawer') drawer: MatDrawer;


  constructor(private router: Router, private APIService: ApiService) {
    this.user = '';
    this.welcome = '';
    this.favoriteCivilizations = [];
    this.form = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ]),
    });
  }

  // check for token in app
  checkToken(){
    const date1 = moment();
    const date2 = localStorage.getItem("token_since");
    const difference = date1.diff(date2, "minutes");
    this.session = 10 - difference;
    if (localStorage.getItem("token") && difference <= 10) {
      this.login = true;
      this.user = localStorage.getItem("userName");
      this.APIService.favorites$.subscribe( favorites => {
        this.favoriteCivilizations = favorites;
      });
    } else {
      this.login = false;
    }
  }

  // onSubmit
  async onSubmitLogin() {
    const userName: string = this.form.value.userName.trim();
    if( userName && this.form.valid ){
      this.favoriteCivilizations = [];
      this.APIService.login({userName: userName}).subscribe((res: any) => {
        this.localStorageItems(res);
        this.welcome = 'Welcome back';
        this.user = `${res.user.userName}`;
        this.form.reset();
      })
    }
  }

  onSubmitRegister(){
    const userName: string = this.form.value.userName.trim();
    if( userName && this.form.valid ){
      this.APIService.register({userName: userName}).subscribe((res: any) => {
        this.localStorageItems(res);
        this.favoriteCivilizations = [];
        this.welcome = 'Welcome to revenueLabs App';
        this.user = `${res.user.userName}`;
        this.form.reset();
      })
    }
  }

  logout(event: Event){

    event.preventDefault();
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("token_since");
    this.router.navigate(["/"]);
    this.ngOnInit();
  }

  cancel(){
    this.form.reset();
  }

  // redirectTo home or profile
  handleRedirectToHome(){
    if (!this.login) this.router.navigate(['/']);
    this.router.navigate(['/all_favorite_civilizations']);
  }


  // localStorageItems
  localStorageItems(response: any) {
    localStorage.setItem("userId", response.user.id);
    localStorage.setItem("userName", response.user.userName);
    localStorage.setItem("token", response.success);
    localStorage.setItem("token_since", new Date().toString());
    this.router.navigate(["/all_favorite_civilizations"]);
    this.APIService.getFavoriteCivilizations(localStorage.getItem('userId')).subscribe((data: any) => {
      for (let i = 0; i < data.civilizations.length; i++) {
        if (data.civilizations[i].favoriteCivilizations === true)
        this.favoriteCivilizations.push(data.civilizations[i].name);
      }
    })
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.checkToken();
  }
}

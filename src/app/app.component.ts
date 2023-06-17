import { Component, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie-app';
  isDarkTheme!: Observable<boolean>;

  constructor(
    private _sharedService: SharedService,
    ) { }

  ngOnInit() {
    var theme = localStorage.getItem("isDarkTheme");
    if (!!theme) {
      this._sharedService.setDarkTheme(!!theme);
    } 
    this.isDarkTheme = this._sharedService.isDarkTheme;
  }
}

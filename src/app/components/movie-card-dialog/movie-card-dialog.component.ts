import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-movie-card-dialog',
  templateUrl: './movie-card-dialog.component.html',
  styleUrls: ['./movie-card-dialog.component.scss']
})
export class MovieCardDialogComponent implements OnInit {

  @Input() movie: any;
  @Output() closeModal = new EventEmitter();
  isChecked = false;
  isDarkTheme!: Observable<boolean>;

  constructor(
    private _sharedService: SharedService
  ) { }

  ngOnInit(): void {
    var theme = localStorage.getItem("isDarkTheme");
    if (!!theme) {
      this._sharedService.setDarkTheme(!!theme);
      this.isChecked = true;
    } 
    this.isDarkTheme = this._sharedService.isDarkTheme;
    this.movie = JSON.parse(localStorage.getItem('selectedMovie') as string);
  }

  getImage(movieTitle: string) {
    const temp = movieTitle?.split(" ");
    const url = 'https://ui-avatars.com/api/?name=' + temp?.join("+");
    return url;
  }

  close() {
    this.closeModal.emit();
  }

}

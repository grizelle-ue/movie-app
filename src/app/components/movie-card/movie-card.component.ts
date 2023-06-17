import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  @Input() movie: any;

  constructor() { }

  ngOnInit(): void {
  }

  getImage(movieTitle: string) {
    const temp = movieTitle.split(" ");
    const url = 'https://ui-avatars.com/api/?name=' + temp.join("+");
    return url;
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject, debounceTime, filter, takeUntil } from 'rxjs';
import { AppFilterPipe } from 'src/app/pipes/filter';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {

  movies: any;
  pageNumber = 1;
  totalMovies = 0;
  isLoading = false;
  errorExists = false;
  isDarkTheme!: Observable<boolean>;
  isChecked = false;
  searchText = "";
  searchTyped = new BehaviorSubject<string>('');
  private _unsubscribeAll: Subject<any>;
  @ViewChild('modal', { static: false }) myModal!: ElementRef;
  elm!: HTMLElement;
  movie: any;

  constructor(
    private _sharedService: SharedService,
    private appFilter: AppFilterPipe
  ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    var theme = localStorage.getItem("isDarkTheme");
    if (!!theme) {
      this._sharedService.setDarkTheme(!!theme);
      this.isChecked = true;
    } 
    this.isDarkTheme = this._sharedService.isDarkTheme;
    this.searchTyped
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(250),
        filter((str: string) => str.length > 3))
      .subscribe((str: string) => {
        this.filterMovies();
      });

      this.searchTyped
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter((str: string) => str.length === 3))
      .subscribe((str: string) => {
        this.clear();
      });
    this.fetchMovies();
  }

  ngAfterViewInit(): void {
    this.elm = this.myModal.nativeElement as HTMLElement;
  }

  close(): void {
      this.elm.classList.remove('show');
      setTimeout(() => {
        this.elm.style.width = '0';
      }, 75);
  }

  open(movie: any): void {
      localStorage.setItem('selectedMovie', JSON.stringify(movie));
      this.movie = movie;
      this.elm.classList.add('show');
      this.elm.style.width = '100vw';
  }

  fetchMovies() {
    this.isLoading = true;
    this._sharedService.fetchMovies(this.pageNumber)
      .subscribe({
        next: (data) => {
          this.totalMovies = data.count;
          this.movies = data.results;
          localStorage.setItem("movies", JSON.stringify(data.results));
          if(data.next) {
            this.pageNumber = this.pageNumber + 1;
          }
          this.errorExists = false;
          this.isLoading = false;
        },
        error: (e) => {
          this.errorExists = true;
          this.isLoading = false;
        },
      });
  }

  onPageChange(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.fetchMovies();
  }

  filterMovies() {
    this.movies = this.appFilter.transform(this.movies, this.searchText, 'title', true);
  }

  clear() {
    this.movies = JSON.parse(localStorage.getItem('movies') as string);
  }

  toggleDarkTheme(checked: boolean) {
    this._sharedService.setDarkTheme(checked);
    if(checked)
      localStorage.setItem('isDarkTheme', checked+'');
    else
      localStorage.removeItem('isDarkTheme');
  }
  
  ngOnDestroy(): void {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }

}

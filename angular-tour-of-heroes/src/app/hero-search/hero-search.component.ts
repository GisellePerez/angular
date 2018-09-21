import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import  { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>; //the declaration of heroes$ as an Observable 

  private searchTerms = new Subject<string>(); //The searchTerms property is declared as an RxJS Subject.

  constructor( private heroService: HeroService ) { }

  //Push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      //wait 300ms after each keystroke before considering the term
      //waits until the flow of new string events pauses for 300 milliseconds before passing along the latest string.
      debounceTime(300),
      
      //ignore new term if same is previous term
      //nsures that a request is sent only if the filter text changed.
      distinctUntilChanged(),

      //switch to new search observable each time the term changes
      /* calls the search service for each search term that makes it through debounce and distinctUntilChanged.
       It cancels and discards previous search observables, returning only the latest search service observable.*/
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}

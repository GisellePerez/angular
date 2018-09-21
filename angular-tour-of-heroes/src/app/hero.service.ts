import { Injectable } from '@angular/core';
 
import { Observable, of } from 'rxjs';
 
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable({ providedIn: 'root' })
export class HeroService {
 
  constructor(private http: HttpClient ,private messageService: MessageService) { }
  
  private heroesUrl = 'api/heroes'; //URL to web api
  //old getHeroes method
  // getHeroes(): Observable<Hero[]> {
  //   // TODO: send the message _after_ fetching the heroes
  //   this.messageService.add('HeroService: fetched heroes');
  //   return of(HEROES);
  // }
 
  getHeroes(): Observable<Hero[]> {
    //return of(HEROES); we'll replace this method with an http.get one
    return this.http.get<Hero[]>(this.heroesUrl) 
    .pipe(
      tap(heroes => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', [])) //acá se pasa el nombre del método y el tipo de dato que devuelve?
    );
  }

  //old getHero method
  // getHero(id: number): Observable<Hero> {
  //   // TODO: send the message _after_ fetching the hero
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }

  getHero(id: number): Observable<Hero> { //esto es por convencion escrito asi?
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** PUT: update the hero on the server */
  //The URL is unchanged. The heroes web API knows which hero to update by looking at the hero's id. 
  //The heroes web API expects a special header in HTTP save requests. That header is in the httpOptions
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions) //must creat const httpOptions
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      ); 
  }


  /** POST: add a new hero to the server */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((hero:Hero) => this.log(`added new hero w/ id=${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }


  /** DELETE: delete the hero from the server */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
  
    return this.http.delete<Hero>(url, httpOptions).pipe( //it calls HttpClient.delete
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }


  /*GET heroes whose name contains search term*/
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`) //query string with the search term
    .pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) { //PREGUNTA: esto hace que un resultado del llamado sea opcional?
    return (error:any): Observable<T> => {
      
      //envía el error a la infraestructura remota
      console.error(error); //log to the console instead

      //better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`)
    
      //let the app keep running by returning an empty result
      return of(result as T);
    }; 
  }
}
import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
//import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes', // the component's CSS selector
  // The CSS element selector, 'app-heroes', matches the name of the HTML element that identifies this component within a parent component's template.

  templateUrl: './heroes.component.html', // the location of the template
  
  styleUrls: ['./heroes.component.css'] // the location of the private CSS
  
})

export class HeroesComponent implements OnInit {
  //ALWAYS export the component so we can import it elsewhere
  
  selectedHero: Hero;

  onSelect(hero:Hero): void {
    this.selectedHero =  hero;
  }

  hero: Hero = {
    id: 1,
    name: 'Windstorm',
  };
  
  //heroes = HEROES; y constructor no tenía nada
  heroes:Hero[];

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero) //now i need to create the addHero method in the service
      .subscribe(hero => { //this callback receives the new hero and pushes it into the heroes list for display
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter( h => h !== hero );
    this.heroService.deleteHero(hero).subscribe(); //now i need to create the deleteHero method in the HeroService
  }
  
  constructor(private heroService: HeroService) { } 
  //The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.

  //not fetching an observable
  // getHeroes() : void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  ngOnInit() {
    // The ngOnInit is a lifecycle hook. Angular calls ngOnInit shortly after creating a component. 
    // It's a good place to put initialization logic.
    this.getHeroes();
  }
  
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes) 
  }
  

}

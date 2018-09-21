import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})


export class HeroDetailComponent implements OnInit {
  
  @Input() hero: Hero;

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero) //ahora necesitamos un método updateHero en hero.service
      .subscribe(() => this.goBack()); //esto hace que persista eñ dato cuando aprieto goBack ???? 
  }

  constructor(
    private route: ActivatedRoute, // holds info about the route to this instance of the HeroDetailComponent
    private heroService: HeroService, // gets hero data from the remote server and the component will use it to display the hero
    private location: Location // Angular service for interacting with the browser
  ) {}
  
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id'); //static img of the rout information
    this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero )
  }


}

import { Component, OnInit } from "@angular/core";
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';
import { Router } from '@angular/router-deprecated';

@Component({
    selector: "my-heroes",
    templateUrl: 'app/heroes.component.html',
    styleUrls: [ 'app/heroes.component.css' ],
    directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit{
    title = 'Tour of heroes';
    heroes: Hero[];
    selectedHero: Hero;
    addingHero = false;
    error: any;
    
    constructor(
      private router: Router,
      private heroService: HeroService){ }

    getHeroes(){
      this.heroService.getHeroes().then(heroes => this.heroes = heroes)
        .catch(error => this.error = error);
    }
   
  addHero(){
     this.addingHero = true;
     this.selectedHero = null;
   }
   
  close(savedHero: Hero){
    this.addingHero = false;
    if(savedHero){
     this.getHeroes();
     }
   }
   
   delete(hero: Hero, event: any){
     event.stopPropagation();
     this.heroService
      .delete(hero)
      .then(res => {
        this.heroes = this.heroes.filter( h => h !== hero);
        if(this.selectedHero === hero){ this.selectedHero = null; }
      })
      .catch(error => this.error = error);
   }
   
    ngOnInit(){
      this.getHeroes();
    }
    
    onSelect(hero: Hero){ 
      this.selectedHero = hero;
      this.addingHero = false;
    }
    
    gotoDetail(){
      this.router.navigate(['HeroDetail', {id: this.selectedHero.id }]);
    }
}



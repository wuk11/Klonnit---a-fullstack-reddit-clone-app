import { Component } from '@angular/core';
import { BackendService } from '../backend.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-front-page-random',
  imports: [CommonModule],
  templateUrl: './front-page-random.component.html',
  styleUrl: './front-page-random.component.css',
})
export class FrontPageRandomComponent {
  constructor(private backend: BackendService, private router: Router) {}

  data: [] = [];
  articles: any = [];

  ngOnInit() {
    this.backend.getRandomArticles().subscribe((res: any) => {
      this.data = res.articles;
      this.articles = this.data;
      console.log(this.articles)
      console.log('init func console log')
      if (this.data.length > 10) {
        this.shuffle(this.data);
        this.articles = this.data.slice(0, 10);
      }
    });
  }

  shuffle(array: []) {
    let index = this.data.length;
    while (index != 0) {
      let randomIndex = Math.floor(Math.random() * index);
      index--;

      [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
    }
  }

  goToCommunity(id: string) {
    this.router.navigate(['community/' + id]);
  }
}

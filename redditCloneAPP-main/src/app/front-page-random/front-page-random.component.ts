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
  constructor(
    private backend: BackendService,
    private router: Router,
  ) {}

  data: [] = [];
  articles: any = [];

  ngOnInit() {
    this.backend.getRandomArticles().subscribe((res: any) => {
      this.data = res.articles;
      this.articles = this.data;
    });
  }

  goToCommunity(id: string) {
    this.router.navigate(['community/' + id]);
  }
}

import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  EventEmitter,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { BackendService } from '../backend.service';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-front-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.css',
})
export class FrontPageComponent {
  constructor(
    private auth: AuthService,
    private backend: BackendService,
  ) {}

  offset: any = 0;
  data: any = {};

  @ViewChild('scrollTrigger') scrollTriger!: ElementRef;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.offset += 50;
        this.getArticles();
      }
    });

    observer.observe(this.scrollTriger.nativeElement);
  }

  ngOnInit() {
    this.getArticles();
  }

  getArticles() {
    this.backend.getCommunities(this.offset).subscribe((res) => {
      if (this.data.communities) {
        this.data.communities = [
          ...this.data.communities,
          ...(res as any).communities,
        ];
      } else {
        this.data = res;
      }
    });
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
}

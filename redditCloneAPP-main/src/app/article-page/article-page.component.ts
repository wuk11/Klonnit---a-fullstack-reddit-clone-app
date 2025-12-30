import { Component, inject } from '@angular/core';
import { BackendService } from '../backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './comment/comment.component';

@Component({
  selector: 'app-article-page',
  imports: [CommonModule, ReactiveFormsModule, CommentComponent],
  templateUrl: './article-page.component.html',
  styleUrl: './article-page.component.css',
})
export class ArticlePageComponent {
  commentForm: FormGroup;
  replyForm: FormGroup;
  editTagsForm: FormGroup;

  constructor(
    private backend: BackendService,
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.commentForm = this.fb.group({
      text: [''],
    });
    this.replyForm = this.fb.group({
      text: [''],
    });
    this.editTagsForm = this.fb.group({
      tags: [[]],
    });
  }

  private route = inject(ActivatedRoute);
  articleId!: string;
  communityId!: string;
  articleData: any = {};
  commentData: any = {};
  comments: any = [];
  activeReplyId: string | null = null;
  isEditFormHidden: boolean = true;
  userData: any = null;

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  postComment(id: string) {
    const { text } = this.commentForm.value;
    this.backend.postComment(id, text).subscribe((res) => {
      window.location.reload();
    });
  }

  ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('id')!;
    this.communityId = this.route.snapshot.paramMap.get('communityId')!;

    this.backend.getArticleData(this.articleId).subscribe((res) => {
      this.articleData = res;
      this.backend.getUser(this.articleData.article.UserId).subscribe((res) => {
        this.userData = res;
      })
    });

    this.backend.getComments(this.articleId).subscribe((res) => {
      this.commentData = res;
      this.comments = this.buildCommentTree(this.commentData.comments);
    });
    
  }

  upvoteArticle(id: string) {
    this.backend.upvoteArticle(id).subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  downvoteArticle(id: string) {
    this.backend.downvoteArticle(id).subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  selectSortButton(event: any) {
    this.sortComments(event.target.value);
  }

  sortComments(sort: string) {
    switch (sort) {
      case 'karma':
        this.commentData.comments.sort((a: any, b: any) => b.karma - a.karma);
        break;
      case 'oldest':
        this.commentData.comments.sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case 'latest':
        this.commentData.comments.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }
  }

  buildCommentTree(comments: any) {
    const roots: any = [];
    const map = new Map();

    comments.forEach((c: any) => {
      c.replies = [];
      map.set(c.id, c);
    });

    comments.forEach((c: any) => {
      if (c.replyToCommentId) {
        map.get(c.replyToCommentId)?.replies?.push(c);
      } else {
        roots.push(c);
      }
    });

    return roots;
  }

  report(reason: string, id: string) {
    this.backend.postArticleReport(reason, id).subscribe((res: any) => {});
  }

  deleteArticle(id: string) {
    this.backend.deleteArticle(id).subscribe({
      next: (res) => {
        this.router.navigate(['community/' + this.communityId]);
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  editTags(id: string) {
    const { tags } = this.editTagsForm.value;
    let arrayOfTags = tags.split(' ');
    this.backend.editTags(id, arrayOfTags).subscribe({
      next: (res: any) => {
        this.articleData = res;
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  toggleEditForm() {
    this.isEditFormHidden = !this.isEditFormHidden;
  }
}

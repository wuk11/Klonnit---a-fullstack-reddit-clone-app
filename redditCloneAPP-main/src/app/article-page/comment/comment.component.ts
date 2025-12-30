import { Component, Input } from '@angular/core';
import { BackendService } from '../../backend.service';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {
  commentForm: FormGroup;
  replyForm: FormGroup;
  reportForm: FormGroup;

  constructor(
    private backend: BackendService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    this.commentForm = this.fb.group({
      text: [''],
    });
    this.replyForm = this.fb.group({
      text: [''],
    });
    this.reportForm = this.fb.group({
      reportText: [''],
    });
  }

  @Input() comment: any = {};

  userData: any = null;
  activeReplyId: string | null = null;

  ngOnInit(){
    this.backend.getUser(this.comment.UserId).subscribe((res) => {
        this.userData = res;
      })
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }

  delete(id: string) {
    this.backend.deleteComment(id).subscribe((res) => {
      window.location.reload();
    });
  }

  postReply(id: string) {
    const { text } = this.replyForm.value;
    this.backend.postReply(id, text).subscribe((res) => {
      window.location.reload();
    });
  }

  toggleReply(id: string) {
    if (this.activeReplyId === id) {
      this.activeReplyId = null;
    } else {
      this.activeReplyId = id;
    }
  }

  upvoteComment(id: string) {
    this.backend.upvoteComment(id).subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  downvoteComment(id: string) {
    this.backend.downvoteComment(id).subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: (err) => {
        alert(err.error.message);
      },
    });
  }

  report(reason: string, id: string) {
    this.backend.postCommentReport(reason, id).subscribe({
      error: (err: any) => {
        alert(err.error.message);
      },
    });
  }
}

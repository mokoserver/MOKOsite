import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";
import {HttpService} from "../http.service";
import {CommentsModalComponent} from "../modals/comments-modal/comments-modal.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments$: Observable<any>;
  title;

  constructor(private activatedRoute: ActivatedRoute,
              private httpService: HttpService, public dialog: MatDialog) {
  }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(data => {
      this.comments$ = this.httpService.getMessage(data.get('comments'));
      this.title = data.get('comments');
    })

  }

  openDialog(id?) {
    const dialog = this.dialog.open(CommentsModalComponent, {
      data: {
        id: id,
        commentsType: this.activatedRoute.snapshot.paramMap.get('comments')
      }
    });

    dialog.afterClosed()
        .subscribe(modalValue => {
          if (modalValue) {
            this.comments$ = this.httpService.getMessage(this.activatedRoute.snapshot.paramMap.get('comments'));
          }
        });
  }

  deleteItem(id) {
    this.httpService.deleteMessage(id).subscribe(() => {});
    this.comments$ = this.httpService.getMessage(this.activatedRoute.snapshot.paramMap.get('comments'));
  }

}

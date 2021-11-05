import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-read-later',
  templateUrl: './read-later.component.html',
  styleUrls: ['./read-later.component.scss']
})
export class ReadLaterComponent implements OnInit {
  readLaters: any;
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.readLaters = JSON.parse(localStorage.getItem('readLaters')!)
  }
  remove(article: any) {
    this.readLaters.splice(this.readLaters.findIndex((a:any) => a.slug_name === article.slug_name) , 1)
    console.log("readLaters", this.readLaters);
    localStorage.removeItem('readLaters');
    localStorage.setItem('readLaters', JSON.stringify(this.readLaters));
    this.snackBar.open('Article Removed', '', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: ['g-red1-bg'],
    });
  }
}

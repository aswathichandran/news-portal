import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/shared/services/news.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articlesData: any;
  filterarticleData: any;
  articleCount: any;
  sectionlist: any;
  loading: boolean = false;
  selectedvalue: any[] = [];
  readlaterarticles: any = []
  pageSize:any = 10;
  pageSizeOptions: any = [5, 10, 25, 100];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  
  constructor(private http: HttpClient, private news: NewsService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.fetchArticles();
    this.fetchSectionList();
  }
  
  // Get All Articles
  async fetchArticles() {
   this.loading = true;
   let res = await this.news.fetchArticle();
    this.articlesData = res.results;
    this.articleCount = res.results.length;
     this.articlesData = res.results.slice(((0 + 1) - 1) * this.pageSize).slice(0, this.pageSize);
    this.filterarticleData = res.results;
    console.log("Article",res);
   this.loading = false;
  }

  // Get All SectionList
  async fetchSectionList() {
    this.loading = true;
    let res:any = await this.news.fetchsections();
    this.sectionlist = res.results;
    this.loading = false;
  }

  // Store Selected Section in array and filter using it
  getSelectedSections(event: any) {
    let isChecked = event.target.checked;
    if (isChecked) {
       this.selectedvalue.push(event.target.value);
    } else {
      this.selectedvalue.splice(this.selectedvalue.findIndex((a: any) => a === event.target.value), 1);
    }
    if (this.selectedvalue.length > 0) {
      this.articlesData = this.filterarticleData.filter((article: any) => {
            return this.selectedvalue.indexOf(article.section) >= 0;
      })
    } else {
      window.location.reload();
      this.fetchSectionList();
    }
  }
  // Save for ReadLater
  readlater(article: any) {
    this.readlaterarticles = JSON.parse(localStorage.getItem('readLaters')!);
    if (this.readlaterarticles == null) { this.readlaterarticles = [] };
    // Push to readLater array if article doesnot exist
    if (!this.readlaterarticles.find((earticle: any) => earticle.slug_name === article.slug_name)) {
       this.readlaterarticles.push(article);
    } else {
      this.snackBar.open('Already added to read Later', '', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        panelClass: ['g-red1-bg']
      });
    }
    localStorage.setItem('readLaters', JSON.stringify(this.readlaterarticles));
  }
  pageChangeEvent(event:any) {
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.articlesData = this.filterarticleData.slice(offset).slice(0, event.pageSize);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  apiKey = environment.apiKey;
  currentuser: any;

  constructor(private http: HttpClient) {
    this.getuserDetails();
  }

 fetchArticle() {
   return this.http.get<any>(`https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=${this.apiKey}`).toPromise();
 }
  
 fetchsections() {
   return this.http.get(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${this.apiKey}`).toPromise();
 }
  
  getuserDetails() {
    this.currentuser = JSON.parse(localStorage.getItem('currentUser')!)
  }
}

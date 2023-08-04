import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatQAService {

  baseUrl:string = 'http://localhost:5000/chatbotqa';

  constructor(private http: HttpClient) { }

  // to get all QA
  getAllQA(appName: string){
    let url = `${this.baseUrl}?appname=${appName}`;
    return this.http.get(url).pipe(map(data=>data));
  }

  // to save QA
  saveQA(appName: string, qaObj: any){
    let url = `${this.baseUrl}?appname=${appName}`;
    return this.http.post(url, qaObj).pipe(map(data=>data));
  }

  // to delete QA
  deleteQA(appName: string, queryString: string){
    let deleteURL = `${this.baseUrl}?appname=${appName}&keyword=${queryString}`;
    this.http.delete(deleteURL).subscribe(data=>console.log(data));
  }
}

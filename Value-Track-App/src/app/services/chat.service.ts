import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { MediatorService } from './mediator.service';

export class Message {
  constructor(public author: string, public content: string[], public alternateAnsIndex: number, public typing?: boolean, public showBtnDiv?: boolean) {}
}

export class MatchedKeyword{
  keyword!: string;
  matchCount!: number;
  probability!: number
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  passDataToChatbotPopupMethod!: Observable<any>;
  private passDataToChatbotPopupMethodSubject = new Subject<any>();
  url: string = 'http://localhost:5000/chatbotqa?appname=value-track';
  conversation: Subject<Message[]>  = new Subject<Message[]>();
  messageMap!: any;
  initialButtons!: any; 
  isValidUrl!: boolean;

  constructor(private http: HttpClient, private mediatorService: MediatorService) { 
    this.passDataToChatbotPopupMethod = this.passDataToChatbotPopupMethodSubject.asObservable();
    this.http.get(this.url).pipe(
      catchError(this.handleError<any>('getQA',{}))
    ).subscribe(data=>{
      let dataObj: any = data;
      if (Object.keys(dataObj).length){
        this.isValidUrl = true;
        this.initialButtons = dataObj['Initial-Chatbot-buttons'];
        this.passDataToChatbotPopupMethodSubject.next([this.isValidUrl, this.initialButtons]);
        this.messageMap = dataObj['QA'];
        this.messageMap["Thanks, that helped!"] = ["Glad that I could help! May I help you with anything else?"];
        this.messageMap["No"] = ["That's Awesome! Have a great day ahead."];
        this.messageMap["Nope"] = ["That's Awesome! Have a great day ahead."];
        this.messageMap["Thank"] = ["You are welcome"];
        this.messageMap["Problem"] = ["Please give me the description about the problem you are facing"];
        this.messageMap["Error"] = ["Please give me the description about the problem you are facing"];
        this.messageMap["defaultmsg"] = ["Sorry, I could not understand you. Please rephrase or ask a different question, or connect our Support or Admin team."];
      }
      else {
        this.isValidUrl = false;
        this.initialButtons = [];
        this.passDataToChatbotPopupMethodSubject.next([this.isValidUrl, this.initialButtons]);
        this.messageMap = {"defaultmsg" : [`<div class="invalid-url">Sorry! We are currently facing technical difficulties.</div>`]};
      }
    });
  }

  // to handle the error if the url is invalid
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // te send the bot answer in the component
  getBotAnswer(msg: string, isNormalQuestion: boolean) {
    const userMessage = new Message('user', [msg], 0);
    this.conversation.next([userMessage]);
    let botMessage: Message;
    if(isNormalQuestion) botMessage = new Message('bot', this.mediatorService.targetMethod(this.getBotMessage(msg)), 0, true, true);
    // Specific feature for value-track
    // **************
    else botMessage = new Message('bot', this.mediatorService.fetchClientAccess(msg), 0, true, true);
    // **************
    
    setTimeout(() => {
      this.conversation.next([botMessage]);
    }, 500);
  }
  
  // to get bot answer for particular question
  getBotMessage(question: string){
    return this.messageMap[this.getMaxProbableKey(question)];
  }

  // to get keyword suggestions from the messageMap
  getSuggestedKeywords(msg: string): MatchedKeyword[]{
    if (msg === '') return [];
    else{
      msg = msg.toLowerCase();
      let keywordsArr: MatchedKeyword[] = [];
      for (let key in this.messageMap){
        keywordsArr.push({
          keyword: key,
          matchCount: 0,
          probability: 0
        });
      }
      let separetor: RegExp = /[.,?!]?[\s\t\n]+/;
      let subKeywordsArr = msg.split(separetor);
      subKeywordsArr.forEach((item)=>{
        if (item !== ''){
          let arr: MatchedKeyword[] = [];
          for (let elem of keywordsArr){
            let subKeywordsInSourceArr = elem.keyword.toLowerCase().split(separetor);
            let len = subKeywordsInSourceArr.length;
            if (subKeywordsInSourceArr.includes(item)){
              elem.matchCount++;
              elem.probability = elem.matchCount/len;
              arr.push(elem);
            }
          }
          if (arr.length){
            keywordsArr = arr;
          }
        }
      });
      return (Object.keys(this.messageMap).length === keywordsArr.length)?[]:keywordsArr;
    }
  }
  // to get maximum Probable Key
  getMaxProbableKey(text: string): string{
    let keywordsArr: MatchedKeyword[] = this.getSuggestedKeywords(text);
    let maxProbability: number = 0;
    let maxProbableKey: string = '';
    if (keywordsArr.length){
      for (let item of keywordsArr){
        if (item.probability > maxProbability){
          maxProbability = item.probability;
          maxProbableKey = item.keyword;
          if (maxProbability === 1) break;
        }
      }
      return maxProbableKey;
    }
    else return 'defaultmsg';
  }
}

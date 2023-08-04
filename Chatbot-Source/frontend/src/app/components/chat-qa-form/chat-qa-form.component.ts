import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatQAService } from 'src/app/services/chat-qa.service';

@Component({
  selector: 'app-chat-qa-form',
  templateUrl: './chat-qa-form.component.html',
  styleUrls: ['./chat-qa-form.component.css']
})
export class ChatQaFormComponent implements OnInit, OnDestroy {

  subscriptionGet!: Subscription;
  subscriptionPost!: Subscription;

  @Input() appNameInUrl!: string;

  @Output() passDataFromQAFormToRightPanelEvent = new EventEmitter<any>();

  chatQAForm!: FormGroup;

  constructor(private fb: FormBuilder, private chatQAService: ChatQAService) { }

  ngOnInit(): void {
    console.log('Creating Form Child');
    this.createChatQAForm();
  }

  ngOnDestroy(): void {
    console.log('Destroying Form Child');
    this.subscriptionGet?.unsubscribe();
    this.subscriptionPost?.unsubscribe();
  }

  // Creating chatQA form using FormBuilder
  createChatQAForm(){
    this.chatQAForm = this.fb.group({
      keyword: [null,Validators.required],
      answer: [null,Validators.required]
    });
  }

  // getter method for all form controls
  get keyword(){
    return this.chatQAForm.get('keyword') as FormControl;
  }

  get answer(){
    return this.chatQAForm.get('answer') as FormControl;
  }

  onSubmit(){
    let q: string = this.keyword.value;
    let a: string = this.answer.value;
    let questionsArr = q.split(';');
    questionsArr = questionsArr.map(ques=>ques.trim()).filter(ques=>ques!=='');
    let answerArr = a.split(';');
    answerArr = answerArr.map(ans=>ans.trim()).filter(ans=>ans!=='');
    if (this.chatQAForm.valid){
      let qaObj = {
        ques: questionsArr,
        ans: answerArr
      }
      this.subscriptionPost = this.chatQAService.saveQA(this.appNameInUrl, qaObj).subscribe(data=>{
        console.log(data);
        console.log('Submitted');
        this.chatQAForm.reset();
        this.subscriptionGet = this.chatQAService.getAllQA(this.appNameInUrl).subscribe(data=>{
          let dataObj: any = data;
          let chatQA: any = dataObj['QA'];
          let QAArray: any = [];
          let itemCount=0;
          for (let key in chatQA){
            let qaItem = {
              id: ++itemCount,
              keyword: key,
              answerArr: chatQA[key],
              rowCount: chatQA[key].length
            };
            QAArray.push(qaItem);
          }
          console.log('Completion of post and get method');
          this.passDataFromQAFormToRightPanelEvent.emit(QAArray);
          console.log('data passed');
        });
      });
    }
  }
}

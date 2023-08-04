import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatQAService } from 'src/app/services/chat-qa.service';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat-table',
  templateUrl: './chat-table.component.html',
  styleUrls: ['./chat-table.component.css']
})
export class ChatTableComponent implements OnInit, OnDestroy {

  // icons
  faTrash = faTrash;
  faPen = faPen;

  keywordToDelete: string = "";
  chatbotQA!: any;
  subscriptionGet!: Subscription;
  @Input() QAArray: any = [];
  @Input() appNameInUrl!: string;

  constructor(private chatQAService: ChatQAService){}

  ngOnInit(): void {
    console.log('Creating table child');
    this.getAllQAToTable();
  }

  ngOnDestroy(){
    console.log('Destroying table child');
    this.subscriptionGet?.unsubscribe();
  }

  // to get all QA
  getAllQAToTable(){
    this.subscriptionGet = this.chatQAService.getAllQA(this.appNameInUrl).subscribe(data=>{
      let dataObj: any = data;
      this.chatbotQA = dataObj['QA'];
      let itemCount=0;
      for (let key in this.chatbotQA){
        let qaItem = {
          id: ++itemCount,
          keyword: key,
          answerArr: this.chatbotQA[key],
          rowCount: this.chatbotQA[key].length
        };
        this.QAArray.push(qaItem);
      }
      console.log('Completion of get method');
    });
  }

  // when we click on delete button in the table, the modal window will appear for confirmation
  confirmDelete(keyword: string): void{
    this.keywordToDelete = keyword;
    let deleteModal = document.getElementById('delete-modal');
    let deleteModalText = document.getElementById('delete-modal-text');
    if(deleteModal && deleteModalText){
      deleteModal.style.display = 'block';
      deleteModal.style.backgroundColor = 'rgb(0 0 0 / 57%)';
      deleteModalText.innerHTML = `Do you really want to delete the Keyword-Answer pair for <i style="color: #364af4;">"${keyword}"</i> Keyword? This process can not be undone.`;
    }
  }

  // When we click Delete button in modal window
  onDelete(){
    let queryString = this.keywordToDelete.split(' ').join('%20');
    this.chatQAService.deleteQA(this.appNameInUrl, queryString);
    this.QAArray = [];
    this.getAllQAToTable();
    this.onClose();
  }

  // for closing modal window
  onClose(){
    this.keywordToDelete = "";
    let deleteModal = document.getElementById('delete-modal');
    let deleteModalText = document.getElementById('delete-modal-text');
    if(deleteModal && deleteModalText){
      deleteModal.style.display = 'none';
      deleteModalText.innerHTML = "";
    }
  }
}

import { Component, OnInit, AfterViewChecked, Renderer2, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { faComments, faTimes, faPaperPlane, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { ChatService, Message, MatchedKeyword } from '../services/chat.service';

@Component({
  selector: 'app-chatbot-popup',
  templateUrl: './chatbot-popup.component.html',
  styleUrls: ['./chatbot-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatbotPopupComponent implements OnInit, AfterViewChecked {
  // icons
  faComments = faComments;
  faTimes = faTimes;
  faPaperPlane = faPaperPlane;
  faArrowRightLong = faArrowRightLong;

  isValidUrl!: boolean;
  openChatEvent: boolean = true;
  enterFloatingChat:boolean = false;
  expandFloatingChat: boolean = false;
  enterChat: boolean = false;
  typing: boolean = false;
  floatingChatPopupElem!: HTMLElement | null;
  chatIcon!: HTMLElement | null;
  textboxElem!: HTMLElement | null;
  messagesElem!: HTMLElement | null;
  emptyAlertMsgElem!: HTMLElement | null;
  suggestedKeywordsElem!: HTMLElement | null;

  initialChatButtons: any = [];
  // Specific feature for value-track
  // *****************
  indexOfTargetButton!: number;
  // *****************
  subBtns: any = [];
  messages!: Message[];
  currentMessage!: Message;
  userMessage: string = '';
  suggestedKeywordsArr: MatchedKeyword[] = [];
  problemNotResolvedArr: string[] =['problem not resolved','still facing problem','still error is coming'];

  constructor(private chatService: ChatService, private renderer: Renderer2, private router: Router){
    this.chatService.passDataToChatbotPopupMethod.subscribe((data) => {
      this.isValidUrl = data[0];
      this.initialChatButtons = data[1];
      if (this.isValidUrl){
        this.messages = [
          new Message('bot',['Good Afternoon'], 0, false, false),
          new Message('bot',['How may I help you today?'], 0, false, false)
        ];
        this.currentMessage = this.messages[this.messages.length-1];
      }
      else{
        this.messages = [
          new Message('bot',['<div class="invalid-url">Good Afternoon</div>'], 0, false, false),
          new Message('bot',[`<div class="invalid-url">Sorry! We apologize for inconvenience. We are currently facing technical difficulties.</div>`], 0, false, false),
          new Message('bot',['<div class="invalid-url">You can connect with our support team for further assistance.\n<div class="text-align-center">Support Help Line: <span class="help-line-color">chatbot.support@cognizant.com</span></div></div>'], 0, false, false),
        ];
        this.currentMessage = this.messages[this.messages.length-1];
      }
    });

    this.renderer.listen('window', 'click',(e:Event)=>{
      if(e.target !== this.textboxElem){
        this.suggestedKeywordsArr = [];
      }
    });
  }

  ngOnInit(): void {
    this.floatingChatPopupElem = document.getElementById('floatingChatPopup');
    this.chatIcon = document.getElementById('chatIcon');
    this.messagesElem = document.querySelector('.messages');
    this.textboxElem = document.querySelector('.text-box');
    this.emptyAlertMsgElem = document.querySelector('.empty-alert');
    this.suggestedKeywordsElem = document.querySelector('.suggested-keywords');
    setTimeout(() => {
      this.enterFloatingChat = true;
    }, 1000);
    this.chatService.conversation.subscribe((data) => {
      this.currentMessage = data[0];
      if (this.currentMessage.author === 'bot' && this.currentMessage.content[0].includes('Please rephrase or ask a different question')){
        this.initialChatButtons.forEach((item: any)=>{
          item.clicked = false;
        });
      }
      this.messages = this.messages.concat(data);
    });
  }

  ngAfterViewChecked(): void {
    let linkArr = document.querySelectorAll('.navigateLink');
    linkArr.forEach((item)=>{
      item.addEventListener('click', this.onLinkClick.bind(this));
    });
  }
  
  // to open chatbot popup
  openChat(){
    // Specific feature for value-track
    // *****************
    let index = this.getBtnIndex();
    if (typeof(index)=== 'number'){
      this.indexOfTargetButton = index;
    }
    // *****************
    if (this.chatIcon) this.chatIcon.style.display = 'none';
    this.expandFloatingChat = true;
    this.enterChat = true;
    this.openChatEvent = false;
    if (this.messagesElem) this.messagesElem.scrollTop = this.messagesElem.scrollHeight;
  }

  // to close chatbot popup
  closeChat(){
    this.enterChat = false;
    if (this.chatIcon) this.chatIcon.style.display = 'block';
    this.expandFloatingChat = false;
    setTimeout(() => {
      this.openChatEvent = true;
    },1);
  }

  // Specific feature for value-track
  // *****************
  // to return targeted button index
  getBtnIndex(): number| undefined{
    for(let i=0;i<this.initialChatButtons.length;i++){
      if (this.initialChatButtons[i].btnName === "Access Request"){
        return i;
      }
    }
    return undefined;
  }
  // ******************

  // to prevent new line in text box when enter key is pressed
  preventNewLine(event: Event){
    event.preventDefault();
  }

  // to send message from user
  sendMessage(event: Event) {
    let text = this.textboxElem?.innerText;
    if (typeof(text) === 'string'){
      this.userMessage = text.trim();
    }
    
    if (this.userMessage === ''){
      this.emptyAlertMsgElem!.style.display = 'block';
      setTimeout(() => {
        this.emptyAlertMsgElem!.style.display = 'none';
      }, 2000);
    }
    else{
      if (this.problemNotResolvedArr.includes(this.userMessage.toLowerCase()) && this.currentMessage.content.length>1 && this.currentMessage.alternateAnsIndex <= this.currentMessage.content.length-1){
        this.continueConversation(this.userMessage);
      }
      else{
        for (let item of this.initialChatButtons){
          if (this.chatService.getMaxProbableKey(item.btnName) === this.chatService.getMaxProbableKey(this.userMessage)){
            this.subBtns = item.subBtns;
            break;
          }
          else{
            this.subBtns = [];
          }
        }

        this.processBotAnswerwithScrolling(this.userMessage);
      }
    }

    this.textboxElem!.innerText = '';
    this.suggestedKeywordsArr = [];
  }

  // generate keywords suggesion based on user input
  generateKewordSuggetions(txt: string){
    this.suggestedKeywordsArr = this.chatService.getSuggestedKeywords(txt);
  }

  // to get suggested keywords answer
  getSuggestionKeywordAns(keyword: string){
    this.textboxElem!.innerText = '';
    this.suggestedKeywordsArr = [];
    this.userMessage = keyword;
    for (let item of this.initialChatButtons){
      if (this.chatService.getMaxProbableKey(item.btnName) === keyword){
        this.subBtns = item.subBtns;
        break;
      }
      else{
        this.subBtns = [];
      }
    }

    this.processBotAnswerwithScrolling(this.userMessage);
  }

  // to stop conversation for a particular query
  stopConversationForParticularQuery(userQuery: string){
    this.currentMessage.showBtnDiv = false;
    this.userMessage = userQuery;
    this.chatService.getBotAnswer(this.userMessage, true);
    setTimeout(() => {
      this.currentMessage.typing = false;
    }, 2000);

    // automatic scrolling down
    this.autoScroll();
  }

  // to continue conversation for a particular query
  continueConversation(userQuery: string){
    this.currentMessage.showBtnDiv = false;
    this.userMessage = userQuery;
    let currentAnswerArr = this.currentMessage.content;
    let ansIndex = this.currentMessage.alternateAnsIndex;
    ansIndex++;
    let userMsg: Message = new Message('user',[userQuery], 0);
    let botMsg: Message;
    this.messages.push(userMsg);

    // automatic scrolling down
    setTimeout(() => {
      this.messagesElem!.scrollTop = this.messagesElem!.scrollHeight;
    }, 1);

    if (this.currentMessage.alternateAnsIndex === this.currentMessage.content.length-1){
      botMsg = new Message('bot',["Sorry! I didn't quite get your query. Please connect with our support or admin team for further assistance."], 0, true, false);
    }
    else{
      botMsg = new Message('bot',currentAnswerArr, ansIndex, true, true);
    }
    this.currentMessage = botMsg;
    setTimeout(() => {
      this.messages.push(botMsg);
    }, 500);
    setTimeout(() => {
      this.messagesElem!.scrollTop = this.messagesElem!.scrollHeight;
    }, 500);
    setTimeout(() => {
      this.currentMessage.typing = false;
    }, 2000);
    setTimeout(() => {
      this.messagesElem!.scrollTop = this.messagesElem!.scrollHeight;
    }, 2000);
  }

  // to start a conversation for a particular header btn
  startConversation(text: string, clicked: boolean){
    this.initialChatButtons.forEach((item: any, index: number)=>{
      if (item.btnName === text){
        this.subBtns = item.subBtns;
      }
      this.initialChatButtons[index].clicked = (item.btnName === text)?true:false;
    });

    this.processBotAnswerwithScrolling(text);
  }

  // when we click on a particular sub button
  onBtnConversation(text: string){
    this.subBtns = [];
    // Specific feature for value-track
    // *****************
    if (text === "Client Access Issue"){
      for (let item of this.initialChatButtons){
        item.clicked = false;
      }
      this.initialChatButtons[this.indexOfTargetButton].clicked = true;
    }
    // ****************
    this.processBotAnswerwithScrolling(text);
  }

  // to get the bot answer and automatic scrolling
  processBotAnswerwithScrolling(msg: string){
    if (this.currentMessage.showBtnDiv) this.currentMessage.showBtnDiv = false;
    let prevMsg = this.messages[this.messages.length-1].content[0].toLowerCase();

    // Specific feature for value-track
    // *****************
    if (this.initialChatButtons[this.indexOfTargetButton]?.clicked && (prevMsg.includes('name of the client you want to access'.toLowerCase()) || prevMsg.includes('I couldn’t get the client name'.toLowerCase()))) this.chatService.getBotAnswer(msg,false);
    // *****************
    else this.chatService.getBotAnswer(msg,true);

    setTimeout(() => {
      this.currentMessage.typing = false;
    }, 2000);

    // automatic scrolling down
    this.autoScroll();
  }

  // function for Automatic scroll down
  autoScroll(){
    setTimeout(() => {
      this.messagesElem!.scrollTop = this.messagesElem!.scrollHeight;
    }, 1);
    setTimeout(() => {
      this.messagesElem!.scrollTop = this.messagesElem!.scrollHeight;
    }, 500);
    setTimeout(() => {
      this.messagesElem!.scrollTop = this.messagesElem!.scrollHeight;
    }, 2000);
  }

  // Specific feature for value-track
  // *****************
  // when we click on exit current query tab button
  onExitQueryTab(text: string){
    this.subBtns = [];
    this.initialChatButtons[this.indexOfTargetButton].clicked = false;
    this.processBotAnswerwithScrolling(text);
  }
  // *****************

  // Specific feature for value-track
  // *****************
  // when we click on a link in chatbot
  onLinkClick(){
    this.router.navigate(['/pending-approvals']);
    this.closeChat();
  }
  // *****************
}
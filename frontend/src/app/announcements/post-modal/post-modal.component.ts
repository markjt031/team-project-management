import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
} from '@angular/core';
import { AnnouncementService } from 'src/app/announcement.service';
import { CompanyService } from 'src/app/company.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css'],
})
export class PostModalComponent implements AfterViewInit {
  title: string = '';
  message: string = '';
  isSubmitDisabled: boolean = true;
  userId: number = -1;
  companyId: number = -1;
  @Input() close: () => void = () => {};
  @ViewChild('.modal-input') textarea: ElementRef | undefined = undefined;

  constructor(
    private announcementService: AnnouncementService,
    private userService: UserService,
    private companyService: CompanyService
  ) {}

  ngOnInit() {
    this.userService.currentUser.subscribe((user) => {
      this.userId = user.id;
    });
    this.companyService.currentCompany.subscribe((company) => {
      this.companyId = company.id;
    });
  }

  checkIfSubmitDisabled = () => {
    this.isSubmitDisabled = this.title === '' || this.message === '';
  };

  postAnnouncement = () => {
    this.announcementService.postAnnouncement(
      this.userId,
      this.title,
      this.message,
      this.companyId
    );
    this.close();
  };

  ngAfterViewInit = () => {
    this.textarea?.nativeElement.addEventListener(
      'input',
      this.autoResize,
      false
    );
  };

  autoResize = (event: any) => {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  };
}

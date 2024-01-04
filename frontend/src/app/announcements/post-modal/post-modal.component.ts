import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Input,
} from '@angular/core';
import { AnnouncementService } from 'src/app/announcement.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css'],
})
export class PostModalComponent implements AfterViewInit {
  title: string = '';
  message: string = '';
  isSubmitDisabled: boolean = true;
  @Input() close: () => void = () => {};
  @ViewChild('.modal-input') textarea: ElementRef | undefined = undefined;

  constructor(private announcementService: AnnouncementService) {}

  checkIfSubmitDisabled = () => {
    this.isSubmitDisabled = this.title === '' || this.message === '';
  };

  postAnnouncement = () => {
    // this.announcementService.postAnnouncement(this.message);
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

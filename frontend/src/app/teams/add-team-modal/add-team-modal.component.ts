import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-team-modal',
  templateUrl: './add-team-modal.component.html',
  styleUrls: ['./add-team-modal.component.css']
})
export class AddTeamModalComponent {
  @Output() close= new EventEmitter<void>()

  onModalClose(){
    console.log("closing")
    this.close.emit()
  }
}

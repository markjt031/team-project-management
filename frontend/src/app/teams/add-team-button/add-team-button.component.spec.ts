import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamButtonComponent } from './add-team-button.component';

describe('AddTeamButtonComponent', () => {
  let component: AddTeamButtonComponent;
  let fixture: ComponentFixture<AddTeamButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeamButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTeamButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

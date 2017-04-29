import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule, MdDialogModule, MdDialogRef } from '@angular/material';
import { TodoDescriptionComponent } from './todo-description.component';
import { SpeechRecognitionService } from './../../shared/speech-recognition.service';
import 'hammerjs';

export class MdDialogRefMock {
  _containerInstance: {
    dialogConfig: {
      data: {
        todo: {
          description: 'note 1 Plus',
          text: 'note 1'
        }
      }
    }
  };
}

describe('TodoDescriptionComponent', () => {
  let component: TodoDescriptionComponent;
  let fixture: ComponentFixture<TodoDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoDescriptionComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialModule.forRoot(),
        MdDialogModule.forRoot(),
      ],
      providers: [
        SpeechRecognitionService,
        { provide: MdDialogRef, useClass: MdDialogRefMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingEditorComponent } from './scheduling-editor.component';

describe('SchedulingEditorComponent', () => {
  let component: SchedulingEditorComponent;
  let fixture: ComponentFixture<SchedulingEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulingEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

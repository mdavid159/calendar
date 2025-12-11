import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliabilityPageComponent } from './avaliability-page.component';

describe('AvaliabilityPageComponent', () => {
  let component: AvaliabilityPageComponent;
  let fixture: ComponentFixture<AvaliabilityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliabilityPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliabilityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

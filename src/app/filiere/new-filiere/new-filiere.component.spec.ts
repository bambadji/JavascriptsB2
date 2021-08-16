import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFiliereComponent } from './new-filiere.component';

describe('NewFiliereComponent', () => {
  let component: NewFiliereComponent;
  let fixture: ComponentFixture<NewFiliereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFiliereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

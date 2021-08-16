import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailFiliereComponent } from './detail-filiere.component';

describe('DetailFiliereComponent', () => {
  let component: DetailFiliereComponent;
  let fixture: ComponentFixture<DetailFiliereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailFiliereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailFiliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

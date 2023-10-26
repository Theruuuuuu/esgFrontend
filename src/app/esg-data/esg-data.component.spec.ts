import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsgDataComponent } from './esg-data.component';

describe('EsgDataComponent', () => {
  let component: EsgDataComponent;
  let fixture: ComponentFixture<EsgDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsgDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsgDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

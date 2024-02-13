import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardRestoComponent } from './dasboard-resto.component';

describe('DasboardRestoComponent', () => {
  let component: DasboardRestoComponent;
  let fixture: ComponentFixture<DasboardRestoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DasboardRestoComponent]
    });
    fixture = TestBed.createComponent(DasboardRestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

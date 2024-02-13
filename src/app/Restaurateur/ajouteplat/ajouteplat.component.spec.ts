import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteplatComponent } from './ajouteplat.component';

describe('AjouteplatComponent', () => {
  let component: AjouteplatComponent;
  let fixture: ComponentFixture<AjouteplatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouteplatComponent]
    });
    fixture = TestBed.createComponent(AjouteplatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

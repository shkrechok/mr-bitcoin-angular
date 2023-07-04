import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEditPageComponent } from './contact-edit-page.component';

describe('ContactEditPageComponent', () => {
  let component: ContactEditPageComponent;
  let fixture: ComponentFixture<ContactEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactEditPageComponent]
    });
    fixture = TestBed.createComponent(ContactEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

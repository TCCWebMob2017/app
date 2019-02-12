import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaMedicaPage } from './ficha-medica.page';

describe('FichaMedicaPage', () => {
  let component: FichaMedicaPage;
  let fixture: ComponentFixture<FichaMedicaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaMedicaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaMedicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

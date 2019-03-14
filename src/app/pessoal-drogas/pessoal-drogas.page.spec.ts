import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoalDrogasPage } from './pessoal-drogas.page';

describe('PessoalDrogasPage', () => {
  let component: PessoalDrogasPage;
  let fixture: ComponentFixture<PessoalDrogasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoalDrogasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoalDrogasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

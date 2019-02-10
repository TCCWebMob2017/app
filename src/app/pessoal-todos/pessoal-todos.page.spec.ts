import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoalTodosPage } from './pessoal-todos.page';

describe('PessoalTodosPage', () => {
  let component: PessoalTodosPage;
  let fixture: ComponentFixture<PessoalTodosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoalTodosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoalTodosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

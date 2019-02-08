import { TestBed } from '@angular/core/testing';

import { PessoalService } from './pessoal.service';

describe('PessoalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PessoalService = TestBed.get(PessoalService);
    expect(service).toBeTruthy();
  });
});

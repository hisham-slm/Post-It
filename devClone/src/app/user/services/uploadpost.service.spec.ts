import { TestBed } from '@angular/core/testing';

import { UploadpostService } from './uploadpost.service';

describe('UploadpostService', () => {
  let service: UploadpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

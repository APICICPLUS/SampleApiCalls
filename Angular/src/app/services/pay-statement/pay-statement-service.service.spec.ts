/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PayStatementServiceService } from './pay-statement-service.service';

describe('Service: PayStatementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayStatementServiceService]
    });
  });

  it('should ...', inject([PayStatementServiceService], (service: PayStatementServiceService) => {
    expect(service).toBeTruthy();
  }));
});

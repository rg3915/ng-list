import { TestBed } from '@angular/core/testing';

import { CollectableItemService } from './collection.service';

describe('CollectableItemService', () => {
  let service: CollectableItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectableItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed, inject } from '@angular/core/testing';

import { MatchEditorService } from './match-editor.service';

describe('MatchEditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchEditorService]
    });
  });

  it('should be created', inject([MatchEditorService], (service: MatchEditorService) => {
    expect(service).toBeTruthy();
  }));
});

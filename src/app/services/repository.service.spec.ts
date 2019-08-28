import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RepositoryService } from './repository.service';
import { environment } from 'src/environments/environment';

describe('RepositoryService', () => {
  let injector: TestBed;
  let service: RepositoryService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepositoryService],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    service = injector.get(RepositoryService);
    httpMock = injector.get(HttpTestingController);
  });

  describe('#getRepos', () => {
    it('should return an Observable<string[]>', () => {
      const dummyRepos: any[] = [
        { id: 123, name: 'angular', node_id: 'xyz====', full_name: 'abc/angular', private: false },
        { id: 1345, name: 'java', node_id: 'xyz1233====', full_name: 'abc/java', private: false }
      ];

      const resultRepos = ['angular', 'java'];
      service.getRepos('demo').subscribe(repos => {
        expect(repos.length).toBe(2);
        expect(JSON.stringify(repos)).toEqual(JSON.stringify(resultRepos));
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/demo/repos`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyRepos);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RepoResponse } from '../models/repo-response';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RepositoryService {


  constructor(private http: HttpClient) {}

  // get all repos based on username
  getRepos(username: string): Observable<string[]> {
    return this.http.get<RepoResponse[]>(`${environment.baseUrl}/${username}/repos`).pipe(map(response => {
      return response.map(repo => repo.name);
    }));
  }
}

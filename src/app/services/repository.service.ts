import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RepositoryService {


  constructor(private http: HttpClient) {}

  // get all repos based on username
  getRepos(username: string) {
    return this.http.get<any>(`${environment.baseUrl}/${username}/repos`).pipe(map(response => {
      return response.map(repo => repo.name);
    }));
  }
}

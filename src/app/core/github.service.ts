import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {share} from 'rxjs/operators';

@Injectable()
export class GithubService {

  constructor(private http: HttpClient) {
  }

  public getPackageJson(root: string) {
    return this.http.get<any>(`https://raw.githubusercontent.com/hhangular/hhangular/master${root}/package.json`).pipe(
      share()
    );
  }

  public getPackageLockJson() {
    return this.http.get<any>('https://raw.githubusercontent.com/hhangular/hhangular/master/package-lock.json').pipe(
      share()
    );
  }
}

import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

export const USER_ID = new InjectionToken<Observable<string>>('UserId');


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; 
import { catchError, delay, map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class CloudService { 
    api_root: string = "http://localhost:8000/";
  
    constructor(private http: HttpClient) {}
  
	// post, path, get, delete
	post(endpoint: string, data: any): Observable<any> {
		return this.http.post(this.api_root + endpoint, data);
	}

 	patch(endpoint: string, data: any): Observable<any> {
		return this.http.patch(this.api_root + endpoint, data);
	}

	get(endpoint: string): Observable<any> {
		return this.http.get(this.api_root + endpoint);
	}

  	delete(endpoint: string): Observable<any> {
		return this.http.delete(this.api_root + endpoint);
	}

}
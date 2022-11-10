import { Injectable } from '@angular/core';
import { Bucket } from 'src/app/Bucket';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BucketService {
  private apiUrl = 'http://localhost:5000/buckets'

  constructor(private http: HttpClient) { }

  getBuckets(): Observable<Bucket[]> {
    return this.http.get<Bucket[]>(this.apiUrl)
  }
}

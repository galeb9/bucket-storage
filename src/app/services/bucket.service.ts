import { Injectable } from '@angular/core';
import { Bucket, File } from 'src/app/Bucket';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class BucketService {
  private apiUrl = 'http://localhost:5000/buckets'

  constructor(private http: HttpClient) { }

  getBuckets(): Observable<Bucket[]> {
    return this.http.get<Bucket[]>(this.apiUrl)
  }

  deleteBucket(bucket: Bucket): Observable<Bucket> {
    const url = `${this.apiUrl}/${bucket.id}`;
    return this.http.delete<Bucket>(url)
  }

  createBucket(bucket: Bucket) : Observable<Bucket> {
    return this.http.post<Bucket>(this.apiUrl, bucket, httpOptions)
  }

  uploadFile(bucketID: number, bucket: Bucket): Observable<Bucket> {
    const url = `${this.apiUrl}/${bucketID}`;
    return this.http.put<Bucket>(url, bucket)
  }

  deleteFile(bucketID: number, bucket: Bucket): Observable<Bucket> {
    const url = `${this.apiUrl}/${bucketID}`;
    return this.http.put<Bucket>(url, bucket)
  }
}

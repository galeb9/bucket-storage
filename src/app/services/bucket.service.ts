import { Injectable } from '@angular/core';
import { Bucket, File } from 'src/app/Bucket';
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

  deleteBucket(bucket: Bucket): Observable<Bucket> {
    const url = `${this.apiUrl}/${bucket.id}`;
    return this.http.delete<Bucket>(url)
  }
  // deleteFile(bucketID: any, file: File): Observable<File> {
  //   const url = `${this.apiUrl}/${bucketID}`;
  //   return this.http.delete<File>(url)
  // }
}

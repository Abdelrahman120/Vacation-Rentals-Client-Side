import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get('http://127.0.0.1:8000/api/categories');
  }

  getCategory(id: number) {
    return this.http.get('http://127.0.0.1:8000/api/categories/' + id);
  }
  addCategory(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/categories', data);
  }

  updateCategory(id: number, data: any) {
    return this.http.put('http://127.0.0.1:8000/api/categories/' + id, data);
  }
  deleteCategory(id: number) {
    return this.http.delete('http://127.0.0.1:8000/api/categories/' + id);
  }
}

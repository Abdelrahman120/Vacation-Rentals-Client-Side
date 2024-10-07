import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  private url = 'http://127.0.0.1:8000/api';
  constructor(private http: HttpClient , private router : Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/login`, { email, password });
}

// logout(): Observable<any> {
//   const token = localStorage.getItem('owner_auth_token');
//   const headers = new HttpHeaders({
//     Authorization: `Bearer ${token}`
//   });
//   return this.http.post(`${this.url}/logout`, {} , { headers });
// }

// logoutUser(): Observable<any> {
//   const token = localStorage.getItem('token');
//   const headers = new HttpHeaders({
//     Authorization: `Bearer ${token}`
//   });
//   return this.http.post(`${this.url}/logout`, {} , { headers });
// }

logout(): Observable<any> {
  const token = localStorage.getItem('owner_auth_token') || localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No valid token found');
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.post(`${this.url}/logout`, {}, { headers });
}




// Clear local storage and redirect based on role
clearSessionAndRedirect(role: string): void {
  // Clear common storage items
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('token');
  localStorage.removeItem('user_role');

  // Add any specific items for each role if needed
  // if (role === 'owner') {
  //   localStorage.removeItem('owner_auth_token');  // Example if needed
  // }
  
  // Redirect user to their respective login page
  switch(role) {
    case 'admin':
      this.router.navigate(['/login/owner']);
      break;
    case 'owner':
      this.router.navigate(['/login/owner']);
      break;
    default:
      this.router.navigate(['/login']);
  }
}










getCurrentUser(){
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userid');
  if (token) {
    return {
      token : token,
      userId : userId
    }
  }
  return null;
}
}

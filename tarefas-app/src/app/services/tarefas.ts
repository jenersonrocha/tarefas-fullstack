import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  private apiUrl = 'http://localhost:5111/api/tarefas';

  constructor(private http: HttpClient) { }

  getTarefas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createTarefa(tarefa: any): Observable<any> {
    return this.http.post(this.apiUrl, tarefa);
  }

  updateTarefa(id: number, tarefa: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, tarefa);
  }

  deleteTarefa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
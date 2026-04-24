import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarefasService } from './services/tarefas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html'
})
export class App implements OnInit {

  tarefas: any[] = [];

  novaTarefa = {
    titulo: '',
    descricao: '',
    concluida: false
  };

  editando: boolean = false;
  tarefaEditandoId: number | null = null;

  loading: boolean = false;

  constructor(private tarefasService: TarefasService) {}

  ngOnInit() {
    this.carregarTarefas();
  }

  // LISTAR
  carregarTarefas() {
    this.tarefasService.getTarefas().subscribe({
      next: (data) => {
        this.tarefas = data;
      },
      error: (err) => console.error(err)
    });
  }

  // CRIAR / EDITAR
  salvarTarefa() {

    if (!this.novaTarefa.titulo.trim()) return;

    if (this.editando && this.tarefaEditandoId !== null) {

      this.tarefasService.updateTarefa(this.tarefaEditandoId, {
        id: this.tarefaEditandoId,
        titulo: this.novaTarefa.titulo,
        descricao: this.novaTarefa.descricao,
        concluida: this.novaTarefa.concluida
      }).subscribe({
        next: () => {
          this.carregarTarefas(); // 🔥 sempre sincroniza
          this.cancelarEdicao();
        },
        error: (err) => console.error(err)
      });

    } else {

      this.tarefasService.createTarefa(this.novaTarefa)
        .subscribe({
          next: (nova) => {
            this.carregarTarefas(); // 🔥 evita inconsistência
            this.novaTarefa = {
              titulo: '',
              descricao: '',
              concluida: false
            };
          },
          error: (err) => console.error(err)
        });
    }
  }

  // EDITAR
  editarModo(tarefa: any) {
    this.editando = true;
    this.tarefaEditandoId = tarefa.id;

    this.novaTarefa = {
      titulo: tarefa.titulo,
      descricao: tarefa.descricao,
      concluida: tarefa.concluida
    };
  }

  // CANCELAR
  cancelarEdicao() {
    this.editando = false;
    this.tarefaEditandoId = null;

    this.novaTarefa = {
      titulo: '',
      descricao: '',
      concluida: false
    };
  }

  // DELETAR
  deletarTarefa(id: number) {

    if (this.loading) return;
    this.loading = true;

    this.tarefasService.deleteTarefa(id).subscribe({
      next: () => {
        this.carregarTarefas(); // 🔥 padronizado
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // ✔ CONCLUIR / DESMARCAR (CORRIGIDO)
  toggleConcluida(tarefa: any) {

    if (this.loading) return;

    this.loading = true;

    const updated = {
      ...tarefa,
      concluida: !tarefa.concluida
    };

    this.tarefasService.updateTarefa(tarefa.id, updated).subscribe({
      next: () => {

        this.carregarTarefas(); // 🔥 CORREÇÃO PRINCIPAL

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // TRACK BY
  trackByTarefa(index: number, tarefa: any) {
    return tarefa.id;
  }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjetoApi.Data;
using ProjetoApi.Models;

namespace ProjetoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TarefasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TarefasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tarefa>>> Get()
        {
            return await _context.Tarefas.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tarefa>> Get(int id)
        {
            var tarefa = await _context.Tarefas.FindAsync(id);

            if (tarefa == null)
                return NotFound();

            return tarefa;
        }

        [HttpPost]
        public async Task<ActionResult<Tarefa>> Post(Tarefa tarefa)
        {
            _context.Tarefas.Add(tarefa);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = tarefa.Id }, tarefa);
        }
[HttpPut("{id}")]
public async Task<IActionResult> Put(int id, Tarefa tarefa)
{
    Console.WriteLine("TITULO: " + tarefa.Titulo);
    Console.WriteLine("DESCRICAO: " + tarefa.Descricao);
    Console.WriteLine("CONCLUIDA: " + tarefa.Concluida);

    var tarefaExistente = await _context.Tarefas.FindAsync(id);

    if (tarefaExistente == null)
        return NotFound();

    tarefaExistente.Titulo = tarefa.Titulo;
    tarefaExistente.Descricao = tarefa.Descricao;
    tarefaExistente.Concluida = tarefa.Concluida;

    await _context.SaveChangesAsync();

    return NoContent();
}

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var tarefa = await _context.Tarefas.FindAsync(id);

            if (tarefa == null)
                return NotFound();

            _context.Tarefas.Remove(tarefa);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
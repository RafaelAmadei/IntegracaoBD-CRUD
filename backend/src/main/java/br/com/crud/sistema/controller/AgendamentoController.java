package br.com.crud.sistema.controller;
import br.com.crud.sistema.repository.AgendamentoClienteProjection;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.crud.sistema.entity.Agendamento;
import br.com.crud.sistema.repository.AgendamentoRepository;

@RestController
@RequestMapping("/agendamentos")
@CrossOrigin(origins = "*")
public class AgendamentoController {

    private final AgendamentoRepository repository;

    public AgendamentoController(AgendamentoRepository repository) {
        this.repository = repository;
    }

    // listar todos os agendamentos
    @GetMapping
    public List<Agendamento> listar() {
        return repository.findAll();
    }

    // buscar agendamento pelo id
    @GetMapping("/{id}")
    public ResponseEntity<Agendamento> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // cadastrar agendamento
    @PostMapping
    public Agendamento cadastrar(@RequestBody Agendamento agendamento) {
        return repository.save(agendamento);
    }

    // atualizar agendamento
    @PutMapping("/{id}")
    public ResponseEntity<Agendamento> atualizar(
            @PathVariable Long id,
            @RequestBody Agendamento dados) {

        Optional<Agendamento> agendamentoExistente = repository.findById(id);

        if (agendamentoExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Agendamento agendamento = agendamentoExistente.get();

        agendamento.setDataHora(dados.getDataHora());
        agendamento.setServico(dados.getServico());
        agendamento.setStatus(dados.getStatus());
        agendamento.setCliente(dados.getCliente());

        return ResponseEntity.ok(repository.save(agendamento));
    }

    // cancelar agendamento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelar(@PathVariable Long id) {

        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
    // listar agendamentos junto com os dados dos clientes
@GetMapping("/com-clientes")
public List<AgendamentoClienteProjection> listarComClientes() {
    return repository.listarAgendamentosComClientes();
}
}

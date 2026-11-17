package br.com.crud.sistema.controller;
import br.com.crud.sistema.repository.ClienteAgendamentosProjection;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.crud.sistema.entity.Cliente;
import br.com.crud.sistema.repository.ClienteRepository;

@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    private final ClienteRepository repository;

    public ClienteController(ClienteRepository repository) {
        this.repository = repository;
    }

    // listar todos os clientes
    @GetMapping
    public List<Cliente> listar() {
        return repository.findAll();
    }

    // buscar um cliente pelo id
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // cadastrar um cliente
    @PostMapping
    public Cliente cadastrar(@RequestBody Cliente cliente) {
        return repository.save(cliente);
    }

    // atualizar um cliente
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizar(
            @PathVariable Long id,
            @RequestBody Cliente dados) {

        Optional<Cliente> clienteExistente = repository.findById(id);

        if (clienteExistente.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Cliente cliente = clienteExistente.get();

        cliente.setNome(dados.getNome());
        cliente.setTelefone(dados.getTelefone());
        cliente.setEmail(dados.getEmail());

        return ResponseEntity.ok(repository.save(cliente));
    }

    // excluir um cliente
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
    // contar agendamentos de cada cliente
@GetMapping("/total-agendamentos")
public List<ClienteAgendamentosProjection> contarAgendamentos() {
    return repository.contarAgendamentosPorCliente();
}
}

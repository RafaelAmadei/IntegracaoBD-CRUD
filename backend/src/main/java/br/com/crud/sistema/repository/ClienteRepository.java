package br.com.crud.sistema.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.crud.sistema.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    @Query(value = """
        SELECT
            c.id AS idCliente,
            c.nome AS nomeCliente,
            COUNT(a.id) AS totalAgendamentos
        FROM clientes c
        LEFT JOIN agendamentos a
            ON c.id = a.cliente_id
        GROUP BY c.id, c.nome
        """, nativeQuery = true)
    List<ClienteAgendamentosProjection> contarAgendamentosPorCliente();

}

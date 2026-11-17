
package br.com.crud.sistema.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.crud.sistema.entity.Agendamento;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

    @Query(value = """
        SELECT
            a.id AS idAgendamento,
            a.servico AS servico,
            a.status AS status,
            c.nome AS nomeCliente,
            c.telefone AS telefoneCliente
        FROM agendamentos a
        INNER JOIN clientes c
            ON a.cliente_id = c.id
        """, nativeQuery = true)
    List<AgendamentoClienteProjection> listarAgendamentosComClientes();

}

package br.com.crud.sistema.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.crud.sistema.entity.Agendamento;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {

}

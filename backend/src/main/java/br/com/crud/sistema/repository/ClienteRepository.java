package br.com.crud.sistema.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.crud.sistema.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}

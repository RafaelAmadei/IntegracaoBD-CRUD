package br.com.crud.sistema.repository;

public interface AgendamentoClienteProjection {

    Long getIdAgendamento();

    String getServico();

    String getStatus();

    String getNomeCliente();

    String getTelefoneCliente();
}
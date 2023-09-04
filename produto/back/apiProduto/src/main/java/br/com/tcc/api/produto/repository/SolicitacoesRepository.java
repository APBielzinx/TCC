package br.com.tcc.api.produto.repository;

import br.com.tcc.api.produto.model.Solicitacoes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolicitacoesRepository extends JpaRepository <Solicitacoes,Long> {

    Solicitacoes findByIdSolicitacoes( long id);

    boolean existsByEmail(String email);

    Solicitacoes findByEmail(String email);

}

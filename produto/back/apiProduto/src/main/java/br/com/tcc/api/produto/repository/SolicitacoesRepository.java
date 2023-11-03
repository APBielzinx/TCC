package br.com.tcc.api.produto.repository;

import br.com.tcc.api.produto.model.Lazer;
import br.com.tcc.api.produto.model.Solicitacoes;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SolicitacoesRepository extends JpaRepository <Solicitacoes,Long> {

    Solicitacoes findByIdSolicitacoes( long id);

    boolean existsByEmail(String email);

    Solicitacoes findByEmail(String email);

    List <Solicitacoes> findByLazer(Lazer lazer);

    @Transactional
    void deleteAllByLazer(Lazer lazer);

}

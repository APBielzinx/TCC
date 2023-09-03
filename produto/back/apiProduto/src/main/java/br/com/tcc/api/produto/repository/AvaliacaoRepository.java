package br.com.tcc.api.produto.repository;

import br.com.tcc.api.produto.model.Avaliacao;
import br.com.tcc.api.produto.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao , Long> {

    boolean existsByUser(Usuario usuario);

    boolean existsByLazerId( long idLazer);

    Avaliacao findByUser(Usuario usuario);
}

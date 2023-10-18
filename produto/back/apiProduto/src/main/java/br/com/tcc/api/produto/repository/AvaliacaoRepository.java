package br.com.tcc.api.produto.repository;

import br.com.tcc.api.produto.model.Avaliacao;
import br.com.tcc.api.produto.model.Lazer;
import br.com.tcc.api.produto.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao , Long> {


    boolean existsByUsuario (Usuario usuario);

            Avaliacao findByUsuario(Usuario usuario);

}

package br.com.tcc.api.produto.repository;

import br.com.tcc.api.produto.model.Avaliacao;
import br.com.tcc.api.produto.model.Lazer;
import br.com.tcc.api.produto.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao , Long> {


    boolean existsByUsuarioAndAndLazer (Usuario usuario, Lazer lazer);

    Avaliacao findByUsuario(Usuario usuario);

   List <Avaliacao> findByLazer(Lazer lazer);

   void deleteByLazer(Lazer lazer);

}

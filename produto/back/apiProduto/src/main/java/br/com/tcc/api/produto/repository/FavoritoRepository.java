package br.com.tcc.api.produto.repository;

import br.com.tcc.api.produto.model.Favorito;
import br.com.tcc.api.produto.model.Lazer;
import br.com.tcc.api.produto.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Long> {


  boolean existsByLazer(Lazer lazer);

    List<Favorito> findByUsuario(Usuario usuario);

    Favorito findByLazer(Lazer lazer);

    boolean existsByLazerAndUsuario(Lazer lazer, Usuario usuario);

    void deleteByLazer(Lazer lazer);

    Favorito findById(long id);
}

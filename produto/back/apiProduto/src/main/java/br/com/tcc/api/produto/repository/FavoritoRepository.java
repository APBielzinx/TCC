package br.com.tcc.api.produto.repository;

import br.com.tcc.api.produto.model.Favorito;
import br.com.tcc.api.produto.model.Lazer;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FavoritoRepository extends JpaRepository<Favorito, Long> {


    boolean ExistsByLazer(Lazer Lazer);

    Favorito findByLazer(String lazer);

}

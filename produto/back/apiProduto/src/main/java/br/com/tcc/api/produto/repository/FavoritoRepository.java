package br.com.tcc.api.produto.repository;

import br.com.tcc.api.produto.model.Favorito;
import br.com.tcc.api.produto.model.Lazer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Long> {


//    boolean existsByLazer(Lazer lazer);

   // Favorito findByLazer(String lazer);

}

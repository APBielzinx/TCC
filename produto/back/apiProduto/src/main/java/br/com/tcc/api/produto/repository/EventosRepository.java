package br.com.tcc.api.produto.repository;
import br.com.tcc.api.produto.model.Eventos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventosRepository extends JpaRepository<Eventos, Long> {

}

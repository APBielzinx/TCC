package br.com.tcc.api.produto.repository;

import br.com.tcc.api.produto.model.Evento;
import br.com.tcc.api.produto.model.Lazer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoRepository extends JpaRepository<Evento, Long> {

    boolean existsByLazer(Lazer lazer);

    Evento findByIdEvento(Long id);

    Evento findByLazer(Lazer lazer);

}

package br.com.tcc.api.produto.repository;

import br.com.tcc.api.produto.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    boolean existsByContato(String contato);

    Chat findByContato(String contato);


}

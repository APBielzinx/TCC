package br.com.tcc.api.produto.repository;
import br.com.tcc.api.produto.model.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

}

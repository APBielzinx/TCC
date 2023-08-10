package br.com.tcc.api.produto.repository;
import br.com.tcc.api.produto.model.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AdministradorRepository extends JpaRepository<Administrador, Long> {

//    @Query(value = "select cnpj from administrador where cnpj = ?1", nativeQuery=true)
//    String find = (String cnpj);
}

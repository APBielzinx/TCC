package br.com.tcc.api.produto.repository;
import br.com.tcc.api.produto.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    boolean existsByIdUsuario(Long id);
    boolean existsByEmail(String email);
    Usuario findByEmail(String email);
Usuario findByIdUsuario(Long id);

}

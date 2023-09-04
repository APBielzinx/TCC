package br.com.tcc.api.produto.repository;

import br.com.tcc.api.produto.model.Administrador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministradorRepository extends JpaRepository<Administrador, Long> {


    boolean existsByEmail(String email);

    Administrador findByEmail(String email);

}

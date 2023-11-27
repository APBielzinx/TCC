package br.com.tcc.api.produto.repository;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.model.Lazer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdministradorRepository extends JpaRepository<Administrador, Long> {


    boolean existsByEmail(String email);

    Administrador findByEmail(String email);

    List<Administrador> findByLazer(Lazer lazer);

    void deleteAllByLazer(Lazer lazer);

    Administrador findByIdAdm(long id);

    void deleteByLazer(Lazer lazer);



}

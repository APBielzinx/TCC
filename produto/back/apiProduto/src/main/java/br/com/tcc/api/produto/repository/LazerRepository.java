package br.com.tcc.api.produto.repository;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.model.Lazer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LazerRepository extends JpaRepository<Lazer, Long> {
    boolean existsByNome(String nome);

    List<Lazer> findAllByCategoria(String categoria);


    boolean existsByIdLazer(Long id);

    Lazer findByIdLazer(Long id);

    Lazer findByAdministradores(Administrador administrador);



}

package br.com.tcc.api.produto.repository;

import br.com.tcc.api.produto.model.Lazer;
import org.springframework.data.jpa.repository.JpaRepository;


public interface LazerRepository extends JpaRepository<Lazer, Long> {
    boolean existsByName (String nome);

    Lazer findByName(String nome);
}

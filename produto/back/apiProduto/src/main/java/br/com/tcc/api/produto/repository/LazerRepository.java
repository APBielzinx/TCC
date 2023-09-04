package br.com.tcc.api.produto.repository;

import br.com.tcc.api.produto.model.Lazer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LazerRepository extends JpaRepository<Lazer, Long> {
    boolean existsByNome(String nome);

    Lazer findByNome(String nome);
}

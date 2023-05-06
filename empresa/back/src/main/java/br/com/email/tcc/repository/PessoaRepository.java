package br.com.email.tcc.repository;

import br.com.email.tcc.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface PessoaRepository extends JpaRepository<Person, Long> {


@Query(value = "select email_enviado from Pessoa where email = ?1", nativeQuery = true)
  String  findByEmail(String email);
@Transactional
@Modifying
@Query(value = "update Pessoa set email_enviado = ?1 where email = ?2", nativeQuery = true)
  void updatePerson(int emailEnviado, String email);

}

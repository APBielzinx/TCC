package com.example.teste.repository;

import com.example.teste.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;


@Repository
public interface PessoaRepository extends JpaRepository<Person, Long> {


@Query(value = "select email_enviado from pessoa where email = ?1", nativeQuery = true)
  String  findByEmail(String email);
@Transactional
@Modifying
@Query(value = "update pessoa set email_enviado = ?1 where email = ?2", nativeQuery = true)
  void updatePerson(int emailEnviado, String email);
  @Transactional
  @Modifying
@Query(value = "insert into pessoa (date,email,email_enviado) values (?1,?2,?3)", nativeQuery = true)
  void insertPerson(Date date, String email, int emailEnviado);

}

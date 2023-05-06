package br.com.email.tcc.service;

import br.com.email.tcc.model.Person;
import br.com.email.tcc.repository.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class PersonService {

    @Autowired
    PessoaRepository pessoaRepository;

    @Autowired
    Person person;


    public ResponseEntity<?> cadastrar(String email) {
        System.out.println(email);
        person.setEmail(email);
        var entity = pessoaRepository.findByEmail(person.getEmail());
        System.out.println(entity);
        if (entity == null){
            entity = "0";
        }
        int entitys = Integer.parseInt(entity);
        if ( entitys == 0) {

            person.setEmailEnviado(1);
            person.setDate(new Date());
            pessoaRepository.save(person);

            return new ResponseEntity<>("Adicionado com sucesso", HttpStatus.CREATED);

        }else if(entitys == 9) {
            person.setEmailEnviado(entitys);
            person.setDate(new Date());
            pessoaRepository.updatePerson(person.getEmailEnviado(), person.getEmail());
            return new ResponseEntity<>("Você ja enviou 5 email aguarde um dia para enviar mais", HttpStatus.BAD_REQUEST);

        }else if( entitys >0 && entitys<=8) {
            System.out.println("OI"+person.getEmailEnviado() +" ||" +person.getEmail());

            person.setEmailEnviado(entitys+1);
            person.setDate(new Date());
            System.out.println(entity);
            System.out.println(person.getEmailEnviado());
            pessoaRepository.updatePerson(person.getEmailEnviado(), person.getEmail());
            return new ResponseEntity<>("atualizado com sucesso", HttpStatus.OK);
        }
        return new ResponseEntity<>("Ocorreu um erro no servidor", HttpStatus.INTERNAL_SERVER_ERROR);


    }




}




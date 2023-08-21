package br.com.tcc.api.produto.services;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.repository.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class AdministradorService {

    @Autowired
    AdministradorRepository administradorRepository;

    public ResponseEntity<?> cadastrar(Administrador administrador) {

    if (administradorRepository.existsByCnpj(administrador.getCnpj()) || administradorRepository.existsByEmail(administrador.getEmail())){

        return new ResponseEntity<>("Já está em uso o cpf ou email",HttpStatus.BAD_REQUEST);

    }else {

        administradorRepository.save(administrador);

        return new ResponseEntity<>("Cadastrado com sucesso",HttpStatus.CREATED);


    }

    }
}

package br.com.tcc.api.produto.services;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.repository.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;


@RequestMapping("Administrador")

public class AdministradorService {
    @Autowired
    AdministradorRepository administradorRepository;

    @Autowired
    Administrador administrador;

//    public ResponseEntity<?> cadastrar (String nome, String email, String senha){
//        administrador.setEmail(email);
//        administrador.setNome(nome);
//        administrador.setSenha(senha);
//        var indentificador = AdministradorRepository.find(administrador.getCnpj());
//        int indentify = Integer.parseInt(indentificador);
//        if ( identify == 0) {
//            return new ResponseEntity<>("Cadastrado com sucesso", HttpStatus.CREATED);
//
//        }else if(indentify == 1) {
//
//            return new ResponseEntity<>("Já existe um administrador com esse email", HttpStatus.BAD_REQUEST);
//
//        }
//    }



}

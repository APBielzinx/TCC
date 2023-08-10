package br.com.tcc.api.produto.services;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.repository.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;


@RequestMapping("Eventos")
public class UsuarioServices {

    @Autowired
    AdministradorRepository administradorRepository;

    @Autowired
    Administrador administrador;





}


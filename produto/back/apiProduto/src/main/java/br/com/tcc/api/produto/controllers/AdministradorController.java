package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.services.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("administrador")
public class AdministradorController {

    @Autowired
    private AdministradorService administradorService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> cadastrarAdministrador(@RequestBody Administrador administrador) {

    return administradorService.cadastrar(administrador);

    }
}

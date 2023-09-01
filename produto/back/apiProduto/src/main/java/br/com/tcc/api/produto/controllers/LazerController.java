package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.model.Lazer;
import br.com.tcc.api.produto.services.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/lazer")
public class LazerController {

    @Autowired
    private AdministradorService administradorService;
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Administrador> buscarTodos(){
        return administradorService.buscarAdministrador();
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> cadastrarLazer(@RequestBody Lazer lazer) {

        try {
            return new ResponseEntity<>("cadastrado com sucesso", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("erro no servidor", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}

package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.services.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/administrador")
public class AdministradorController {

    @Autowired
    private AdministradorService administradorService;


    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Administrador> buscarTodos(){
        return administradorService.buscarAdministrador();
    }
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> cadastrarAdministrador(@RequestBody Administrador administrador) {

    return administradorService.cadastrar(administrador);

    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE,
    consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> atualizarAdministrador(@RequestBody Administrador administrador){

        return administradorService.atualizar(administrador);

    }

    @DeleteMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deletarAdministrador(@RequestBody Administrador administrador){
        return administradorService.deletar(administrador);
    }

}

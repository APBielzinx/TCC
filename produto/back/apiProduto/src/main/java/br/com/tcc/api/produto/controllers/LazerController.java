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
    
    @Autowired
    LazerService lazerService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Lazer> buscarLazer() {
        return  lazerService.buscarLazer();
    }

    @GetMapping(value ="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> BuscarPorId(@PathVariable ("id")Long id){
        return lazerService.BuscarPorId(id);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> Cadastrar(@RequestBody Lazer lazer){
        return lazerService.Cadastrar(lazer);
    }


    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
                produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> AtualizarLazer (@RequestBody Lazer lazer){
        return lazerService.AtualizarLazer(lazer);
    }

    @DeleteMapping(consumes = MediaType.APPLICATION_JSON_VALUE )
    public ResponseEntity<?> ExcluirLazer(@RequestBody Lazer lazer){
        return lazerService.ExcluirLazer(lazer);
    }

}

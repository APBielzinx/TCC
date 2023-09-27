package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.model.Lazer;
import br.com.tcc.api.produto.services.AdministradorService;
import br.com.tcc.api.produto.services.LazerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/lazer")
@Tag(name = "Areas de lazer", description = "Gerenciamento das areas de lazer" )
public class LazerController {

    @Autowired
    LazerService lazerService;

    @GetMapping(value = "/parque",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Lazer> buscarParque() {
        return  lazerService.buscarParque();
    }

    @GetMapping(value = "/lazer", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Lazer> buscarLazer() { return  lazerService.buscarLazer();}
    @GetMapping( produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Lazer> buscarTudo() { return lazerService.buscarTudo();}

    @GetMapping(value ="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> BuscarPorId(@PathVariable ("id")Long id){
        return lazerService.BuscarPorId(id);
    }


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> Cadastrar(@RequestBody Lazer lazer){
        return lazerService.Cadastrar(lazer);
    }


    @PutMapping(value = "/{lazer}", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> AtualizarLazer (@RequestBody Lazer lazer){
        return lazerService.AtualizarLazer(lazer);
    }

    @DeleteMapping(value ="/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> ExcluirLazer(@PathVariable("id") Long id){

        return lazerService.ExcluirLazer(id);

    }

}
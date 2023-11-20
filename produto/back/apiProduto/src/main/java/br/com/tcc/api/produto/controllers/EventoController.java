package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.model.Evento;
import br.com.tcc.api.produto.model.Lazer;
import br.com.tcc.api.produto.services.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping(value = "api/evento")
public class EventoController {

    @Autowired
    EventoService eventoService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Evento>buscarTudo(){
        return eventoService.ListarEvento();
    }

    @GetMapping(value = "/{idEvento}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?>buscarPorLazer(@PathVariable("idEvento")long id){
        return eventoService.BuscarEventoPorLazer(id);
    }

@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<?>cadastrar(Evento evento){
        System.out.println(evento);
    return eventoService.CriarNovoEvento(evento);
}

}

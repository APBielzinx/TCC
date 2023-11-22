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


    @GetMapping(value = "data/{dataEvento}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?>buscarPorData(@PathVariable("dataEvento")String data){
        return eventoService.BuscarEventoPorData(data);
    }

@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public ResponseEntity<?>cadastrar(@RequestBody  Evento evento){
    return eventoService.CriarNovoEvento(evento);
}

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?>atualizar(@RequestBody  Evento evento){
        return eventoService.AtualizarEvento(evento);
    }

    @DeleteMapping(value = {"/{idEvento}"},consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?>deletar(@PathVariable("idEvento")long id){
        return eventoService.deletarEvento(id);
    }

}

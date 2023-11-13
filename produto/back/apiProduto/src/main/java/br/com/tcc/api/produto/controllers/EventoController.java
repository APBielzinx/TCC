package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.model.Evento;
import br.com.tcc.api.produto.model.Lazer;
import br.com.tcc.api.produto.services.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping(value = "/lazer", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?>buscarPorLazer(Lazer lazer){
        return eventoService.BuscarEventoPorLazer(lazer);
    }


}

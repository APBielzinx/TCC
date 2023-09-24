package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Avaliacao;
import br.com.tcc.api.produto.services.AvaliacaoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/avaliacao")
@Tag(name = "Avaliação", description = "Gerenciamento das avaliações" )
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Avaliacao> buscarAvaliacoes(){
        return avaliacaoService.ListarAvaliacao();
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> BuscarPorId(@PathVariable("Ava_Usuario")Long id){
        return avaliacaoService.BuscarId(id);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> Avaliar(@RequestBody Avaliacao avaliacao){
        return  avaliacaoService.Avaliar(avaliacao);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
                produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> AtualizarAvaliacao(@RequestBody Avaliacao avaliacao){
        return avaliacaoService.AtualizarAvaliacao(avaliacao);
    }

    @DeleteMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> RetirarAvaliacao(@RequestBody Avaliacao avaliacao){
        return avaliacaoService.RetirarAvaliacao(avaliacao);
    }







}

package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.model.Avaliacao;
import br.com.tcc.api.produto.services.AvaliacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/avaliacao")
@Tag(name = "Avaliação", description = "Gerenciamento das avaliações" )
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Buscar todas avaliações ",
            tags = {"Avaliação","Get"}
    )
    public List<Avaliacao> buscarAvaliacoes(){
        return avaliacaoService.ListarAvaliacao();
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Buscar uma avaliação por id",
            description = "exemplo: url_da_api/avaliacao/{idAvaliação}",
            tags = {"Avaliação","Get"}
    )
    public ResponseEntity<?> BuscarPorId(@PathVariable("Ava_Usuario")Long id){
        return avaliacaoService.BuscarId(id);
    }

    @GetMapping(value = "parque/{idParque}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Buscar uma avaliação por id",
            description = "exemplo: url_da_api/avaliacao/{idAvaliação}",
            tags = {"Avaliação","Get"}
    )
    public ResponseEntity<?> BuscarPorIdParque(@PathVariable("idParque")Long id){
        return avaliacaoService.BuscarIdParque(id);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Criar uma avaliação nova",
            description = "exemplo: { 'pontuacao' : (pont), <br> 'usuario' : {idUsuario : (idUsr)}, <br> 'lazer' : {'idLazer' : (idLazr)}, <br> 'comentario' : (Coment) <br> }",
            tags = {"Avaliação","Post"}
    )
    @ApiResponses({ //Login bem sucedido
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "501", description = "Já existe uma avaliação para este parque", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Precisa estar logado", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> Avaliar(@Parameter(hidden = true) @RequestBody Avaliacao avaliacao){
        return  avaliacaoService.Avaliar(avaliacao);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
                produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Atualizar uma avaliação",
            description = "exemplo: { 'pontuacao' : (pont), <br> 'usuario' : {idUsuario : (idUsr)}, <br> 'lazer' : {'idLazer' : (idLazr)}, <br> 'comentario' : (Coment) <br>  }",
            tags = {"Avaliação","Put"}
    )
    @ApiResponses({ //Login bem sucedido
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Avaliação não encontrada", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> AtualizarAvaliacao(@Parameter(hidden = true) @RequestBody Avaliacao avaliacao){
        return avaliacaoService.AtualizarAvaliacao(avaliacao);
    }

    @DeleteMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Retirar uma avaliação",
            description = "exemplo: { 'pontuacao' : (pont), <br> 'usuario' : {idUsuario : (idUsr)}, <br> 'lazer' : {'idLazer' : (idLazr)}, <br> 'comentario' : (Coment) <br> }",
            tags = {"Avaliação","Delete"}
    )
    @ApiResponses({ //Login bem sucedido
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Avaliação não encontrada", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> RetirarAvaliacao(@Parameter(hidden = true) @RequestBody Avaliacao avaliacao){
        return avaliacaoService.RetirarAvaliacao(avaliacao);
    }







}

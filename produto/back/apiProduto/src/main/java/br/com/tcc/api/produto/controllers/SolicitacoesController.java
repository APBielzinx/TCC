package br.com.tcc.api.produto.controllers;


import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.model.Solicitacoes;
import br.com.tcc.api.produto.services.SolicitacoesService;
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
@RequestMapping("api/solicitacoes")
@Tag(name = "Solicitações", description = "Gerenciamento dos pedidos dos parques para virarem adms" )
public class SolicitacoesController {

    @Autowired
    SolicitacoesService solicitacoesService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Buscar solicitações",
            description = "exemplo: use o link para puxar todas as solicitações",
            tags = {"Solicitações", "Get"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Solicitacoes.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    public List<Solicitacoes> buscarSolicitacoes(){

        return solicitacoesService.buscarTodasSolicitacoes();

    }

    @GetMapping(value = "/{id}",produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Buscar solicitações por Email",
            description = "exemplo: { <br> 'id':'{SolId}' <br> } ",
            tags = {"Solicitações", "Get"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Solicitacoes.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> buscarSolicitacoesPorId(@PathVariable("id") Long id ){

        return solicitacoesService.buscarSolicitacoesPorId(id);

    }


    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Cadastra uma solicitação nova",
            description = "exemplo: { <br> 'email':'{SolEmail}', <br> 'senha':'{SolSenha}' <br> }  ",
            tags = {"Solicitações", "Post"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Solicitacoes.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> cadastrarSolicitacao(@Parameter(hidden = true) @RequestBody Solicitacoes solicitacoes){

        return solicitacoesService.cadastar(solicitacoes);


    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Atualiza uma solicitação já existente",
            description = "exemplo: { <br> 'email':'{nSolEmail}', <br> 'senha':'{nSolSenha}' <br> } ",
            tags = {"Solicitações", "Put"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Solicitacoes.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    @Parameter(name = "Object")
    public ResponseEntity<?> atualizarSolicitacao(@Parameter(hidden = true) @RequestBody Solicitacoes solicitacoes){

        return solicitacoesService.atualizar(solicitacoes);

    }

    @DeleteMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Deleta uma solicitação já existente",
            description = "exemplo: 'url_da_api'/{idSol}",
            tags = {"Solicitações", "Delete"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Solicitacoes.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> deletarSolicitacao(@Parameter(hidden = true) @RequestBody Solicitacoes solicitacoes){

        return solicitacoesService.deletar(solicitacoes);

    }

}
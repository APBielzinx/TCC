package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.model.Favorito;
import br.com.tcc.api.produto.model.Lazer;
import br.com.tcc.api.produto.services.FavoritoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("api/favorito")
@Tag(name = "Favoritos", description = "Gerenciamento dos Favoritos" )
public class FavoritoController {

    @Autowired
    FavoritoService favoritoService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Buscar todos os favoritos",
            tags = {"Favoritos","Get"}
    )
    public List<Favorito> BuscarFavoritos(){
        return favoritoService.ListarFavorito();
    }

    @GetMapping(value = "/{idUsuario}" , produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Buscar um favorito por id",
            description = "exemplo: url_da_api/favorito/{idfavorito}",
            tags = {"Favorito","Get"}
    )
    public ResponseEntity<?> BuscarPorUsuario(@PathVariable("idUsuario")long id){
        return favoritoService.BuscarPorUsuario(id);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Favoritar",
            description = "exemplo: { 'usuario' : {idUsuario : (idUsr)}, <br> 'lazer' : {'idLazer' : (idLazr)} <br> }",
            tags = {"Favorito","Post"}
    )
    @ApiResponses({ //Login bem sucedido
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "501", description = "Já está favoritado", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Precisa estar logado", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> Favoritar (@RequestBody Favorito favorito){

        System.out.println("oi"+favorito);

        return favoritoService.Favoritar(favorito);
    }

    @DeleteMapping(value = {"/{idFavorito}"},produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "desFavoritar",
            description = "exemplo: { 'usuario' : {idUsuario : (idUsr)}, <br> 'lazer' : {'idLazer' : (idLazr)} <br> }",
            tags = {"Favorito","Delete"}
    )
    @ApiResponses({ //Login bem sucedido
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "501", description = "Não está favoritado", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Precisa estar logado", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> RetirarFavorito (@PathVariable("idFavorito") long id){
        return favoritoService.RetirarFavorito(id);
    }

}
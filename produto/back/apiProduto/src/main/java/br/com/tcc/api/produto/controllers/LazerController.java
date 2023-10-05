package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.model.Avaliacao;
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
    @Operation(
            summary = "Buscar Parques",
            description = "exemplo: 'url_da_api'/lazer/parque",
            tags = {"Areas de lazer", "Get"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Lazer.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    public List<Lazer> buscarParque() {
        return  lazerService.buscarParque();
    }

    @GetMapping(value = "/lazer", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Buscar areas de lazer",
            description = "exemplo: 'url_da_api'/lazer/lazer",
            tags = {"Areas de lazer", "Get"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Lazer.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    public List<Lazer> buscarLazer() { return  lazerService.buscarLazer();}
    @GetMapping( produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Buscar areas de lazer em geral",
            description = "exemplo: 'url_da_api'/lazer",
            tags = {"Areas de lazer", "Get"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Lazer.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    public List<Lazer> buscarTudo() { return lazerService.buscarTudo();}

    @GetMapping(value ="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Buscar areas de lazer por id",
            description = "exemplo: 'url_da_api'/lazer/{idLazer}",
            tags = {"Areas de lazer", "Get"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Lazer.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> BuscarPorId(@PathVariable ("id")Long id){
        return lazerService.BuscarPorId(id);
    }


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Cadastrar novas areas de lazer",
            description = "exemplo: { \n 'nome': '{nomeLazer}',\n 'descricao': '{descLazer}',\n 'endereco': '{endLazer}',\n 'latitude': '{latLazer}',\n 'categoria': '{catLazer}',\n 'longetude': '{lonLazer}',\n 'imagem': '{imgLazer}',\n 'administrador': '{emailAdm}'",
            tags = {"Areas de lazer", "Post"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Lazer.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> Cadastrar(@RequestBody Lazer lazer){
        return lazerService.Cadastrar(lazer);
    }


    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Atualizar areas de lazer existentes",
            description = "exemplo: { \n 'nome': '{nomeLazer}',\n 'descricao': '{descLazer}',\n 'endereco': '{endLazer}',\n 'latitude': '{latLazer}',\n 'categoria': '{catLazer}',\n 'longetude': '{lonLazer}',\n 'imagem': '{imgLazer}',\n 'administrador': '{emailAdm}'",
            tags = {"Areas de lazer", "Put"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Lazer.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    @Parameter(name = "Object")
    public ResponseEntity<?> AtualizarLazer (@RequestBody Lazer lazer){
        return lazerService.AtualizarLazer(lazer);
    }

    @DeleteMapping(value ="/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Excluir areas de lazer",
            description = "exemplo: { \n 'idLazer':'{lazerId}' ",
            tags = {"Areas de lazer", "Delete"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Lazer.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> ExcluirLazer(@PathVariable("id") Long id){

        return lazerService.ExcluirLazer(id);

    }

}
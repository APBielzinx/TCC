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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Lazer.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
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
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Lazer.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    public List<Lazer> buscarLazer() { return  lazerService.buscarLazer();}
    @GetMapping( produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Buscar areas de lazer em geral",
            description = "exemplo: 'url_da_api'/lazer",
            tags = {"Areas de lazer", "Get"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Lazer.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    public List<Lazer> buscarTudo() { return lazerService.buscarTudo();}

    @GetMapping(value ="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Buscar areas de lazer por id",
            description = "exemplo: 'url_da_api'/lazer/{idLazer}",
            tags = {"Areas de lazer", "Get"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Lazer.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> BuscarPorId(@PathVariable ("id")Long id){
        return lazerService.BuscarPorId(id);
    }

    @GetMapping(value = "/adm/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> BuscarPorIdAdm(@PathVariable ("id")Long id){
        return lazerService.BuscarPorIdAdm(id);
    }


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Cadastrar novas areas de lazer",
            description = "exemplo: { <br> 'nome': '{nomeLazer}',<br> 'descricao': '{descLazer}',<br> 'endereco': '{endLazer}',<br> 'latitude': '{latLazer}',<br> 'categoria': '{catLazer}',<br> 'longetude': '{lonLazer}',<br> 'imagem': '{imgLazer}',<br> 'administrador': '{emailAdm}' <br> }",
            tags = {"Areas de lazer", "Post"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Lazer.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> Cadastrar(@Parameter(hidden = true) @RequestBody Lazer lazer){
        return lazerService.Cadastrar(lazer);
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Atualizar areas de lazer existentes",
            description = "exemplo: { <br> 'nome': '(nomeLazer)',<br> 'descricao': '(descLazer)',<br> 'endereco': '(endLazer)',<br> 'latitude': '(latLazer)',<br> 'categoria': '(catLazer)',<br> 'longetude': '(lonLazer)',<br> 'imagem': '(imgLazer)',<br> 'administrador': { email : '(emailAdm)'} <br> }",
            tags = {"Areas de lazer", "Put"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Lazer.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    @Parameter(name = "Object")
    public ResponseEntity<?> AtualizarLazer (@Parameter(hidden = true) @RequestBody Lazer lazer){
        return lazerService.AtualizarLazer(lazer);
    }

    @DeleteMapping(value ="/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Excluir areas de lazer",
            description = "exemplo: { <br> 'idLazer':'{lazerId}' <br> } ",
            tags = {"Areas de lazer", "Delete"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Lazer.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> ExcluirLazer(@PathVariable("id") Long id){

        return lazerService.excluirLazer(id);

    }

}

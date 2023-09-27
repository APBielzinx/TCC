package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.model.UserRole;
import br.com.tcc.api.produto.repository.LazerRepository;
import br.com.tcc.api.produto.security.TokenService;
import br.com.tcc.api.produto.services.AdministradorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.SchemaProperties;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/administrador")
@Tag(name = "Administrador", description = "Gerenciamento dos adms" )
public class AdministradorController {
    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AdministradorService administradorService;




    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Buscar administradores",
            description = "exemplo:",
            tags = {"Administrador", "Get"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    public List<Administrador> buscarTodos(){
        return administradorService.buscarAdministrador();
    }
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Cadastra um administrador novo",
            description = "exemplo:  {\n \"usuario\" ",
            tags = {"Administrador", "Post"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    @Schema ()
    public ResponseEntity<?> cadastrarAdministrador(@RequestBody Administrador administrador) {
        return administradorService.cadastrar(administrador);

    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Atualiza um administrador já existente",
            description = "exemplo:",
            tags = {"Administrador", "Put"}
    )
    @Parameter(name = "Objeto (em lista json)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    @Parameter(name = "Object")
    public ResponseEntity<?> atualizarAdministrador(@RequestBody Administrador administrador){

        return administradorService.atualizar(administrador);

    }

    @DeleteMapping(value = "/{email}", consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Deleta um administrador já existente",
            description = "exemplo:",
            tags = {"Administrador", "Delete"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    @Parameter(name = "Email")
    public ResponseEntity<?> deletarAdministrador(@RequestBody String email){
        return administradorService.deletar(email);
    }
    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Login de um administrador já existente",
            description = "exemplo:",
            tags = {"Administrador", "Post"}
    )
    @Parameter(name = "objeto (lista json)")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    @Parameter(name = "Objeto (em lista json")
    public ResponseEntity<?> login(@RequestBody Administrador administrador){
        System.out.println(administrador);
        var usernamePassword = new UsernamePasswordAuthenticationToken(administrador.getEmail(), administrador.getSenha());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateTokenAdm((Administrador) auth.getPrincipal());
        return administradorService.login(administrador,token);
    }

}
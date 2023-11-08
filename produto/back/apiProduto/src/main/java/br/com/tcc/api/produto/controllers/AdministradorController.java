package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.model.Avaliacao;
import br.com.tcc.api.produto.model.UserRole;
import br.com.tcc.api.produto.repository.LazerRepository;
import br.com.tcc.api.produto.security.TokenService;
import br.com.tcc.api.produto.services.AdministradorService;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
            description = "exemplo: 'url_da_api'/administrador",
            tags = {"Administrador", "Get"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    public List<Administrador> buscarTodos(){
        return administradorService.buscarAdministrador();
    }


    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Cadastra um administrador novo",
            description = "exemplo: { <br> 'email': '{emailAdm}',<br> 'senha': '{senhaAdm}' <br> }",
            tags = {"Administrador", "Post"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    @Parameter(name = "Objeto (em lista json)")
    @JsonIgnore
    public ResponseEntity<?> cadastrarAdministrador(@Parameter(hidden = true) @RequestBody Administrador administrador) {
        return administradorService.cadastrar(administrador);

    }

    @PutMapping(produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Atualiza um administrador já existente",
            description = "exemplo: { <br> 'email': '{emailAdm}',<br> 'senha': '{senhaAdm}' <br> } (necessita estar logado)",
            tags = {"Administrador", "Put"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    @Parameter(name = "Objeto (em lista json)")
    public ResponseEntity<?> atualizarAdministrador(@Parameter(hidden = true) @RequestBody Administrador administrador){

        return administradorService.atualizar(administrador);

    }

    @DeleteMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Deleta um administrador já existente",
            description = "exemplo: { <br> 'email':'{emailAdm}' <br> }'",
            tags = {"Administrador", "Delete"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    @Parameter(name = "Email")
    public ResponseEntity<?> deletarAdministrador(@Parameter(hidden = true) @RequestBody String email){
        return administradorService.deletar(email);
    }
    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Login de um administrador já existente",
            description = "exemplo: { <br> 'email': 'emailAdm',<br> 'senha': 'senhaAdm' <br> } (necessita do token de login)",
            tags = {"Administrador", "Post"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", description = "Não encontrado", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    @Parameter(name = "Objeto (em lista json)")
    public ResponseEntity<?> login(@Parameter(hidden = true) @RequestBody Administrador administrador){
        System.out.println(administrador);
        var usernamePassword = new UsernamePasswordAuthenticationToken(administrador.getEmail(), administrador.getSenha());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateTokenAdm((Administrador) auth.getPrincipal());
        return administradorService.login(administrador,token);
    }

}
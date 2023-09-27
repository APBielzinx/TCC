package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.model.Usuario;
import br.com.tcc.api.produto.security.TokenService;
import br.com.tcc.api.produto.services.UsuarioServices;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@RestController
@RequestMapping("api/usuario")
@Tag(name = "Usuario", description = "Gerenciamento dos usuarios" )

public class UsuarioController {

    @Autowired
    UsuarioServices usuarioServices;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Buscar usuarios",
            description = "exemplo:",
            tags = {"Usuario", "Get"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    public List<Usuario> buscarUsuarios() {

        return  usuarioServices.buscarUsuarios();

    }
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Buscar usuarios por Id",
            description = "exemplo:",
            tags = {"Usuario", "Get"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> buscarUsuarioPorId(@PathVariable("id") Long id) {

        return usuarioServices.buscarUsuarioPorId(id);

    }
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Cadastrar um usuario novo",
            description = "exemplo:",
            tags = {"Usuario", "Post"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            //@ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> cadastrarUsuario(@RequestBody Usuario usuario) {

        return usuarioServices.cadastrar(usuario);

    }

    @PutMapping( consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Atualizar um usuario existente",
            description = "exemplo:",
            tags = {"Usuario", "Put"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    @Parameter(name = "Object")
    public ResponseEntity<?> atualizarUsuario(@RequestBody Usuario usuario){

        return usuarioServices.atualizar(usuario);

    }

    @DeleteMapping(value ="/{id}")
    @Operation(
            summary = "Excluir um usuario existente",
            description = "exemplo:",
            tags = {"Usuario", "Delete"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> deletarUsuario(@PathVariable("id") Long id){

        return usuarioServices.deletar(id);

    }

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Login de um usuario existente",
            description = "exemplo:",
            tags = {"Usuario", "Post"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(schema = @Schema(implementation = Administrador.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "404", content = { @Content(schema = @Schema()) }),
            @ApiResponse(responseCode = "500", content = { @Content(schema = @Schema()) })
    })
    @Parameter(name = "Object")
    public ResponseEntity<?> login(@RequestBody Usuario usuario){
        var usernamePassword = new UsernamePasswordAuthenticationToken(usuario.getEmail(), usuario.getSenha());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateTokenUser((Usuario) auth.getPrincipal());
        return usuarioServices.login(usuario,token);
    }


}
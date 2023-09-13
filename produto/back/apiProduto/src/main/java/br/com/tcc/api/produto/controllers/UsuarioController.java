package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Usuario;
import br.com.tcc.api.produto.security.TokenService;
import br.com.tcc.api.produto.services.UsuarioServices;
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

public class UsuarioController {

    @Autowired
    UsuarioServices usuarioServices;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Usuario> buscarUsuarios() {

        return  usuarioServices.buscarUsuarios();

    }
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> buscarUsuarioPorId(@PathVariable("id") Long id) {

        return usuarioServices.buscarUsuarioPorId(id);

    }
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> cadastrarUsuario(@RequestBody Usuario usuario) {

        return usuarioServices.cadastrar(usuario);

    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> atualizarUsuario(@RequestBody Usuario usuario){

        return usuarioServices.atualizar(usuario);

    }

    @DeleteMapping(value ="/{id}",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deletarUsuario(@RequestParam Long id){

        return usuarioServices.deletar(id);

    }

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody Usuario usuario){
        var usernamePassword = new UsernamePasswordAuthenticationToken(usuario.getEmail(), usuario.getSenha());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        var token = tokenService.generateTokenUser((Usuario) auth.getPrincipal());
        return usuarioServices.login(usuario,token);
    }


}

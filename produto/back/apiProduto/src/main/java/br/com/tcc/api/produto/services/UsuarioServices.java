package br.com.tcc.api.produto.services;


import br.com.tcc.api.produto.model.UserRole;
import br.com.tcc.api.produto.model.Usuario;
import br.com.tcc.api.produto.repository.UsuarioRepository;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class UsuarioServices {

    @Autowired
    UsuarioRepository usuarioRepository;



    BCryptPasswordEncoder criptografar = new BCryptPasswordEncoder();

    public List<Usuario> buscarUsuarios() {

        return usuarioRepository.findAll();

    }


    public ResponseEntity<?> buscarUsuarioPorId(Long id) {


    var   usuario = usuarioRepository.findById(id);

        return new ResponseEntity<>(usuario, HttpStatus.OK);

    }


    public ResponseEntity<?> cadastrar(Usuario usuario) {



        if (usuarioRepository.existsByEmail(usuario.getEmail())) {

            return new ResponseEntity<>("Já está em uso esse email", HttpStatus.BAD_REQUEST);

        } else {
            String senhaCriptografada = criptografar.encode(usuario.getSenha());
            usuario.setSenha(senhaCriptografada);
            usuario.setRole(UserRole.USER);
            usuarioRepository.save(usuario);

            return new ResponseEntity<>("Cadastrado com sucesso", HttpStatus.CREATED);


        }

    }

    public ResponseEntity<?> atualizar(Usuario usuario) {

        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            var select = usuarioRepository.findByEmail(usuario.getEmail());
            String senhaCriptografada = criptografar.encode(usuario.getSenha());
            select.setCep(usuario.getCep());
            select.setUf(usuario.getUf());
            select.setBairro(usuario.getBairro());
            select.setLocalidade(usuario.getLocalidade());
            select.setLogradouro(usuario.getLogradouro());
            select.setEmail(usuario.getEmail());
            select.setSenha(senhaCriptografada);
            usuarioRepository.save(select);
            return new ResponseEntity<>("atualizado com sucesso", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("usuario não encontrado", HttpStatus.NO_CONTENT);
        }


    }

    public ResponseEntity<?>deletar (Long id){
        if (usuarioRepository.existsByIdUsuario(id)){
          var usuario = usuarioRepository.findByIdUsuario(id);
            usuarioRepository.delete(usuario);
            return new ResponseEntity<>("deletado com sucesso", HttpStatus.OK);

        }else {

            return new ResponseEntity<>("usuario não encontrado", HttpStatus.NO_CONTENT);

        }
    }

    public ResponseEntity<?> login(Usuario usuario, String token) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            var select = usuarioRepository.findByEmail(usuario.getEmail());
            boolean isPasswordMatches = criptografar.matches(usuario.getSenha(), select.getSenha());
            if (isPasswordMatches) {
                LoginResponse response = new LoginResponse(select, token);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("usuario não encontrado", HttpStatus.NO_CONTENT);
            }
        }

        return new ResponseEntity<>("erro", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Classe interna para a resposta personalizada JSON
    static class LoginResponse {
        private Usuario select;
        private String token;

        public LoginResponse(Usuario select, String token) {
            this.select = select;
            this.token = token;
        }

        @JsonProperty("select") // Nome do campo no JSON
        public Usuario getSelect() {
            return select;
        }

        @JsonProperty("token") // Nome do campo no JSON
        public String getToken() {
            return token;
        }
    }
}












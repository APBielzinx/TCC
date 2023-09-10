package br.com.tcc.api.produto.services;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.repository.AdministradorRepository;
import br.com.tcc.api.produto.repository.LazerRepository;
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
public class AdministradorService {

    @Autowired
    AdministradorRepository administradorRepository;

    BCryptPasswordEncoder criptografar = new BCryptPasswordEncoder();


    public List<Administrador> buscarAdministrador(){
      return   administradorRepository.findAll();
    }
    public ResponseEntity<?> cadastrar(Administrador administrador) {

    if ( administradorRepository.existsByEmail(administrador.getEmail())){

        return new ResponseEntity<>("Já está em uso o cpf ou email",HttpStatus.BAD_REQUEST);

    }else {
        String senhaCriptografada = criptografar.encode(administrador.getSenha());
        administrador.setSenha(senhaCriptografada);
         administradorRepository.save(administrador);

        return new ResponseEntity<>("Cadastrado com sucesso",HttpStatus.CREATED);


    }

    }

   public  ResponseEntity<?> atualizar(Administrador administrador){

        if ( administradorRepository.existsByEmail(administrador.getEmail())){
            var select = administradorRepository.findByEmail(administrador.getEmail());

            select.setEmail(administrador.getEmail());
            String senhaCriptografada = criptografar.encode(administrador.getSenha());
            administrador.setSenha(senhaCriptografada);
            select.setSenha(administrador.getSenha());
            select.setLazer(administrador.getLazer());


            administradorRepository.save(select);

            return new ResponseEntity<>("atualizado com sucesso", HttpStatus.OK);

        }else {
            return new ResponseEntity<>("email ou cnpj ja esta em uso", HttpStatus.BAD_REQUEST);

        }

   }

    public ResponseEntity<?> deletar(Administrador administrador) {
        if(administradorRepository.existsByEmail(administrador.getEmail())){
            administradorRepository.delete(administrador);
            return new ResponseEntity<>("deletado com sucesso",HttpStatus.OK);
        }else {
            return new ResponseEntity<>("administrador não encontrado",HttpStatus.NO_CONTENT);

        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Administrador administrador, String token) {
        if (administradorRepository.existsByEmail(administrador.getEmail())) {
            var select = administradorRepository.findByEmail(administrador.getEmail());
            boolean isPasswordMatches = criptografar.matches(administrador.getSenha(), select.getSenha());

            if (isPasswordMatches) {
                AdministradorService.LoginResponse response = new AdministradorService.LoginResponse(select, token);
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("usuario não encontrado", HttpStatus.NO_CONTENT);
            }
        }

        return new ResponseEntity<>("erro", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Classe interna para a resposta personalizada JSON
    static class LoginResponse {
        private Administrador select;
        private String token;

        public LoginResponse(Administrador select, String token) {
            this.select = select;
            this.token = token;
        }

        @JsonProperty("select") // Nome do campo no JSON
        public Administrador getSelect() {
            return select;
        }

        @JsonProperty("token") // Nome do campo no JSON
        public String getToken() {
            return token;
        }
    }
}

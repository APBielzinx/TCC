package br.com.tcc.api.produto.services;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.repository.AdministradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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

    if (administradorRepository.existsByCnpj(administrador.getCnpj()) || administradorRepository.existsByEmail(administrador.getEmail())){

        return new ResponseEntity<>("Já está em uso o cpf ou email",HttpStatus.BAD_REQUEST);

    }else {

        String senhaCriptografada = criptografar.encode(administrador.getSenha());
        administrador.setSenha(senhaCriptografada);
        administradorRepository.save(administrador);

        return new ResponseEntity<>("Cadastrado com sucesso",HttpStatus.CREATED);


    }

    }

   public  ResponseEntity<?> atualizar(Administrador administrador){

        if (administradorRepository.existsByCnpj(administrador.getCnpj()) && administradorRepository.existsByEmail(administrador.getEmail())){
            var select = administradorRepository.findByEmail(administrador.getEmail());

            select.setNome(administrador.getNome());
            select.setEmail(administrador.getEmail());
            String senhaCriptografada = criptografar.encode(administrador.getSenha());
            administrador.setSenha(senhaCriptografada);
            select.setSenha(administrador.getSenha());
            select.setCnpj(administrador.getCnpj());

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
}

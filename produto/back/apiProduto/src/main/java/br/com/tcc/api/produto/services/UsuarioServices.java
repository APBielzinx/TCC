package br.com.tcc.api.produto.services;


import br.com.tcc.api.produto.model.Usuario;
import br.com.tcc.api.produto.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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


        usuarioRepository.findById(id);

        return new ResponseEntity<>("encontrado com sucesso", HttpStatus.OK);

    }


    public ResponseEntity<?> cadastrar(Usuario usuario) {



        if (usuarioRepository.existsByEmail(usuario.getEmail())) {

            return new ResponseEntity<>("Já está em uso esse email", HttpStatus.BAD_REQUEST);

        } else {
            String senhaCriptografada = criptografar.encode(usuario.getSenha());
            usuario.setSenha(senhaCriptografada);
            usuarioRepository.save(usuario);

            return new ResponseEntity<>("Cadastrado com sucesso", HttpStatus.CREATED);


        }

    }

    public ResponseEntity<?> atualizar(Usuario usuario) {

        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            var select = usuarioRepository.findAllByEmail(usuario.getEmail());
            String senhaCriptografada = criptografar.encode(usuario.getSenha());

            select.setNome(usuario.getNome());
            select.setEmail(usuario.getEmail());
            select.setSenha(senhaCriptografada);

            usuarioRepository.save(select);
            return new ResponseEntity<>("atualizado com sucesso", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("usuario não encontrado", HttpStatus.NO_CONTENT);
        }


    }

    public ResponseEntity<?>deletar (Usuario usuario){
        if (usuarioRepository.existsByEmail(usuario.getEmail())){

            usuarioRepository.delete(usuario);

            return new ResponseEntity<>("deletado com sucesso", HttpStatus.OK);

        }else {

            return new ResponseEntity<>("usuario não encontrado", HttpStatus.NO_CONTENT);

        }
    }
}











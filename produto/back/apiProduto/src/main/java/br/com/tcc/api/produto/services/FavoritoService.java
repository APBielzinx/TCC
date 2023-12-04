package br.com.tcc.api.produto.services;


import br.com.tcc.api.produto.model.Favorito;
import br.com.tcc.api.produto.repository.FavoritoRepository;
import br.com.tcc.api.produto.repository.LazerRepository;
import br.com.tcc.api.produto.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoritoService {
    @Autowired
    FavoritoRepository favoritoRepository;
    @Autowired
    UsuarioRepository usuarioRepository;

    @Autowired
    LazerRepository lazerRepository;


    public List<Favorito> ListarFavorito(){
        return favoritoRepository.findAll();
    }


    public ResponseEntity<?> BuscarPorUsuario(long id){
        var select = usuarioRepository.findByIdUsuario(id);
        var select1 = favoritoRepository.findByUsuario(select);
        return new ResponseEntity<>(select1, HttpStatus.OK);
    }

    public ResponseEntity<?> Favoritar(Favorito favorito){
        var usuario = usuarioRepository.findByIdUsuario(Long.valueOf(favorito.getUsuario().getIdUsuario()));
        var lazer = lazerRepository.findByIdLazer(favorito.getLazer().getIdLazer());
        if (favoritoRepository.existsByLazerAndUsuario(lazer,usuario)){
            return new ResponseEntity<>("Já esta nos seus favoritos", HttpStatus.BAD_REQUEST);
        }
        else{
            favoritoRepository.save(favorito);
            return new ResponseEntity<>("Adicionado aos favoritos com sucesso", HttpStatus.OK);
        }
    }

    public ResponseEntity<?> RetirarFavorito(long id){
       var favorito = favoritoRepository.findById(id);
        if (favoritoRepository.existsByLazer(favorito.getLazer())){
            favoritoRepository.delete(favorito);
            return new ResponseEntity<>("Favorito retirado com sucesso", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Não está nos seus favoritos", HttpStatus.BAD_REQUEST);
        }
    }

}

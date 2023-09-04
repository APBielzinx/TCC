package br.com.tcc.api.produto.services;


import br.com.tcc.api.produto.model.Favorito;
import br.com.tcc.api.produto.repository.FavoritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoritoService {
    @Autowired
    FavoritoRepository favoritoRepository;

    public List<Favorito> ListarFavorito(){
        return favoritoRepository.findAll();
    }

   /* public ResponseEntity<?> BuscarPorLazer(String Lazer){
       var favorito = favoritoRepository.findByLazer(Lazer);
        return new ResponseEntity<>(favorito, HttpStatus.OK);
    }*/

   /* public ResponseEntity<?> Favoritar(Favorito favorito){
        if (favoritoRepository.existsByLazer(favorito.getLazer().getIdLazer())){
            return new ResponseEntity<>("Já esta nos seus favoritos", HttpStatus.BAD_REQUEST);
        }
        else{
            favoritoRepository.save(favorito);
            return new ResponseEntity<>("Adicionado aos favoritos com sucesso", HttpStatus.OK);
        }
    }

    public ResponseEntity<?> RetirarFavorito(Favorito favorito){
        if (favoritoRepository.existsByLazer(favorito.getLazer())){
            favoritoRepository.delete(favorito);
            return new ResponseEntity<>("Favorito retirado com sucesso", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Não está nos seus favoritos", HttpStatus.BAD_REQUEST);
        }
    }
*/
}

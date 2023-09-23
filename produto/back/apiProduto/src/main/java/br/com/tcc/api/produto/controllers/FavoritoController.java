package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Favorito;
import br.com.tcc.api.produto.services.FavoritoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@RestController
@RequestMapping("api/favorito")
@Tag(name = "Favoritos", description = "Gerenciamento dos Favoritos" )
public class FavoritoController {

    @Autowired
    FavoritoService favoritoService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Favorito> BuscarFavoritos(){
        return favoritoService.ListarFavorito();
    }

  /*  @GetMapping(value = "/{lazer}" , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> BuscarPorLazer(@PathVariable ("lazer")String lazer){
        return favoritoService.BuscarPorLazer(lazer);
    }
*/
 /*   @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> Favoritar (@RequestBody Favorito favorito){
        return favoritoService.Favoritar(favorito);
    }

    @DeleteMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> RetirarFavorito (@RequestBody Favorito favorito){
        return favoritoService.RetirarFavorito(favorito);
    }
*/
}
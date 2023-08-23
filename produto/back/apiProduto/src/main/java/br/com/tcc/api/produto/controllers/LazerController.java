package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Lazer;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("lazer")
public class LazerController {




    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> cadastrarLazer(@RequestBody Lazer lazer) {

        try {
            return new ResponseEntity<>("cadastrado com sucesso", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("erro no servidor", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}

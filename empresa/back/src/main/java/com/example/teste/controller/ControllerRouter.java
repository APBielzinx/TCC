package com.example.teste.controller;


import com.example.teste.model.Email;
import com.example.teste.service.PersonService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@AllArgsConstructor
@RestController
@RequestMapping
public class ControllerRouter {

    private PersonService personService;

    @GetMapping(value="faleConosco/enviar")
    public String home(){

        return "Teste da aplicação";

    }

    @PostMapping(value="faleConosco/enviar",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> enviarEmail(@RequestBody Email email) {
        try {
            if (email.getFrom().equals("")){
                return new ResponseEntity<>("é necessario preencher todos os dados", HttpStatus.NO_CONTENT);

            }else if (personService.cadastrar(email.getFrom()).getStatusCode() == HttpStatus.CREATED){

                System.out.println("dados enviados ");
                return new ResponseEntity<>("Dados criados com sucesso", HttpStatus.CREATED);
            } else if (personService.cadastrar(email.getFrom()).getStatusCode() == HttpStatus.OK) {

                System.out.println("dados Atualizados ");

                return new ResponseEntity<>("Dados atualizados com sucesso", HttpStatus.OK);
            } else if (personService.cadastrar(email.getFrom()).getStatusCode() == HttpStatus.BAD_REQUEST) {

                return new ResponseEntity<>(" Você ja enviou 5 email aguarde um dia para enviar mais", HttpStatus.BAD_REQUEST);
            }else {

                return new ResponseEntity<>("Ocorreu um erro no servidor", HttpStatus.INTERNAL_SERVER_ERROR);

            }

        }catch (Exception ex){
            System.out.println("ocorreu um erro. ERRO: "+ex);

            System.out.println("dados não enviados ");
            return new ResponseEntity<>("erro dados não Enviados",  HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

}






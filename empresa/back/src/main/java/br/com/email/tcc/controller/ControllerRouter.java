package br.com.email.tcc.controller;

import br.com.email.tcc.model.Email;
import br.com.email.tcc.model.Person;
import br.com.email.tcc.repository.PessoaRepository;
import br.com.email.tcc.service.EmailService;
import br.com.email.tcc.service.PersonService;
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

    private EmailService emailService;
    private PessoaRepository pessoaRepository;





    @GetMapping(value="faleConosco/enviar")
    public String home(){

        return "OI";

    }


    @PostMapping(value="faleConosco/enviar",
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> enviarEmail(@RequestBody Email email) {
        try {
            if (email.getName().equals("") || email.getFrom().equals("") || email.getText().equals("") || email.getSubject().equals("")){
                email.setMailSend(2);
                return new ResponseEntity<>("é necessario preencher todos os dados", HttpStatus.NO_CONTENT);

            }else if (personService.cadastrar(email.getFrom()).getStatusCode() == HttpStatus.CREATED){
                email.setMailSend(1);
                emailService.enviarEmail(email);
                System.out.println("dados enviados ");
                return new ResponseEntity<>("Dados criados com sucesso", HttpStatus.CREATED);
            } else if (personService.cadastrar(email.getFrom()).getStatusCode() == HttpStatus.OK) {
                email.setMailSend(1);
                System.out.println("dados Atualizados ");
                emailService.enviarEmail(email);
                return new ResponseEntity<>("Dados atualizados com sucesso", HttpStatus.OK);
            } else if (personService.cadastrar(email.getFrom()).getStatusCode() == HttpStatus.BAD_REQUEST) {
                email.setMailSend(2);
                return new ResponseEntity<>(" Você ja enviou 5 email aguarde um dia para enviar mais", HttpStatus.BAD_REQUEST);
            }else {
                email.setMailSend(2);
                return new ResponseEntity<>("Ocorreu um erro no servidor", HttpStatus.INTERNAL_SERVER_ERROR);

            }

        }catch (Exception ex){
            System.out.println("ocorreu um erro. ERRO: "+ex);
            email.setMailSend(2);
            System.out.println("dados não enviados ");
            return new ResponseEntity<>("erro dados não Enviados",  HttpStatus.INTERNAL_SERVER_ERROR);

        }

    }

    @PostMapping(value = "teste/email")
    public void teste(@RequestBody Person person){

        System.out.println("oi"+person);



    }
}






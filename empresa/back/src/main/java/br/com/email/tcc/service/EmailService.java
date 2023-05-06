package br.com.email.tcc.service;


import br.com.email.tcc.model.Email;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailService {

    private JavaMailSender javaMailSender;

    @Autowired
    private PersonService personService;
    public void enviarEmail(Email email) throws MessagingException {

        MimeMessage mesage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mesage, true);

        mimeMessageHelper.setFrom("gabrielbtcyt@gmail.com");
        mimeMessageHelper.setTo("gabrielbtcyt@gmail.com");
        mimeMessageHelper.setSubject("esse email veio de "+email.getFrom());
        mimeMessageHelper.setText("olá meu nome é "+email.getName()+" o assunto é: "+email.getSubject()+"\n"+"e a mensagem é:\n"+email.getText());



        javaMailSender.send(mesage);

    }
}

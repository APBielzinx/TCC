package br.com.tcc.api.produto.services;

import br.com.tcc.api.produto.model.Chat;
import br.com.tcc.api.produto.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public List<Chat> ListarChat(){
        return chatRepository.findAll();
    };

    public ResponseEntity<?> BuscarChatporContato(String contato){

        chatRepository.findByContato(contato);

        return new ResponseEntity<>("encontrado com sucesso", HttpStatus.OK);
    };

    public ResponseEntity<?> NovoChat(Chat chat){

        if (chatRepository.existsByContato(chat.getContato())){
            return new ResponseEntity<>("Já tem um chat com esse contato", HttpStatus.BAD_REQUEST);
        }
        else {
            chatRepository.save(chat);
            return new ResponseEntity<>("Novo chat criado com sucesso", HttpStatus.OK);
        }


    };


}

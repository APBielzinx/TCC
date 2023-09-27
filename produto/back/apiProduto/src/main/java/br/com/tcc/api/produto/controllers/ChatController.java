package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.model.Chat;
import br.com.tcc.api.produto.services.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import br.com.tcc.api.produto.config.message.Message;
import br.com.tcc.api.produto.config.message.MessageResponse;

import java.util.List;


@RestController
@RequestMapping("/chat")
@Tag(name = "Chat", description = "Gerenciamento dos Chats" )
public class ChatController {

    @Autowired
    private ChatService chatService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Chat> BuscarChats() {
        return chatService.ListarChat();
    }

    @GetMapping(value = "/{contato}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> BuscarChatPorContato(@PathVariable String contato){
        return chatService.BuscarChatporContato(contato);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> NovoChat(@RequestBody Chat chat){
        return chatService.NovoChat(chat);
    }


    @MessageMapping("/chat")
    @SendTo("/topic/messages")

    public MessageResponse sendMessage(Message message) {
        return new MessageResponse(message.getSender(), message.getContent());
    }
}

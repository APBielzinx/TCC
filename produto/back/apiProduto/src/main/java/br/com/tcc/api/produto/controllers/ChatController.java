package br.com.tcc.api.produto.controllers;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.model.Chat;
import br.com.tcc.api.produto.services.ChatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
    @Operation(
            summary = "Lista os chats",
            description = "exemplo:",
            tags = {"Chat", "Get"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Chat.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    public List<Chat> BuscarChats() {
        return chatService.ListarChat();
    }

    @GetMapping(value = "/{contato}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Busca chats pelo contato",
            description = "exemplo: { <br> 'contato':'{contUsr}' <br> }",
            tags = {"Chat", "Get"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Chat.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> BuscarChatPorContato(@PathVariable String contato){
        return chatService.BuscarChatporContato(contato);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Cadastra um chat novo",
            description = "exemplo:",
            tags = {"Chat", "Post"}
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Requisição realizada com sucesso", content = { @Content(schema = @Schema(implementation = Chat.class), mediaType = "application/json") }),
            @ApiResponse(responseCode = "500", description = "Sem autorização necessária", content = { @Content(schema = @Schema()) })
    })
    public ResponseEntity<?> NovoChat(@Parameter(hidden = true) @RequestBody Chat chat){
        return chatService.NovoChat(chat);
    }


    @MessageMapping("/chat")
    @SendTo("/topic/messages")

    public MessageResponse sendMessage(Message message) {
        return new MessageResponse(message.getSender(), message.getContent());
    }
}

package br.com.tcc.api.produto.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idChat;


    private String mensagens;

    @Column(nullable = false)
    private String contato;

    @Column(nullable = false)
    private String nome;

    @ManyToOne
    @JoinColumn(name = "idUsuario",nullable = false)
    private Usuario usuario;
}

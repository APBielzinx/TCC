package br.com.tcc.api.produto.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String conteudo;


    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "idLazer")
    private Lazer Lazer;


}

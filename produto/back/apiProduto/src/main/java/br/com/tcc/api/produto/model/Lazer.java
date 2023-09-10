package br.com.tcc.api.produto.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Lazer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLazer;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private String endereco;

    @Column(nullable = false)
    private String latitude;

    @Column(nullable = false)
    private String longetude;

    @Column(nullable = false)
    private String imagem;


    @ManyToOne
    @JoinColumn(name = "idAdm")
    private Administrador administrador;


}

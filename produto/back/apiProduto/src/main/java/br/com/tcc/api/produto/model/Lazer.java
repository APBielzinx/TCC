package br.com.tcc.api.produto.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

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
    private String categoria;

    @Column(nullable = false)
    private String longetude;

    @Column(nullable = false)
    private String imagem;

    @OneToMany(mappedBy = "lazer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Administrador> administradores;

    @OneToMany(mappedBy = "lazer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Avaliacao> avaliacao;



}

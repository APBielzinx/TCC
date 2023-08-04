package br.com.tcc.apiproduto.model;

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
    private int idAreDeLazer;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String endereco;


    @ManyToOne
    @JoinColumn(name = "idUsuario",nullable = false)
    private Usuario usuario;


    @ManyToOne
    @JoinColumn(name = "idEventos",nullable = false)
    private Eventos eventos;

    @ManyToOne
    @JoinColumn(name = "idCategoria",nullable = false)
    private Categoria categoria;

}

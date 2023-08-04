package br.com.tcc.apiproduto.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Eventos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idEventos;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String endereco;

    @Column(nullable = false)
    private Date data;

    @Column(nullable = false)
    private String descricao;

    @ManyToOne
    @JoinColumn(name = "idUsuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "idAdm", nullable = false)
    private Administrador administrador;
}

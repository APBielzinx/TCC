package br.com.tcc.api.produto.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEvento;

    @Column(nullable = false)
    private String nomeEvento;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private String local ;

    @Column(nullable = false)
    private LocalDate dataInicio;

    @Column(nullable = false)
    private LocalDate dataTermino;

    @Column(nullable = false)
    private int status;

    @ManyToOne
    @JoinColumn (name = "idLazer")
    @JsonBackReference
    private Lazer lazer;


}

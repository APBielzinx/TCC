package br.com.tcc.api.produto.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEvento;

    @Column
    private String nomeEvento;

    @Column
    private String local ;

    @Column
    private LocalDate dataInicio;

    @Column
    private LocalDate dataTermino;

    @Column
    private int status;

    @ManyToOne
    @JoinColumn (name = "idLazer")
    private Lazer lazer;


}

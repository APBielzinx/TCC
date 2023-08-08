package br.com.tcc.apiproduto.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String conteudo;
    private LocalDateTime dataHora;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "areadelazer_id")
    private Lazer areaDeLazer;

    @ManyToOne
    @JoinColumn(name = "evento_id")
    private Eventos evento;

}

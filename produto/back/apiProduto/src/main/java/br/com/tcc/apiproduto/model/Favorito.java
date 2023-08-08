package br.com.tcc.apiproduto.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Favorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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






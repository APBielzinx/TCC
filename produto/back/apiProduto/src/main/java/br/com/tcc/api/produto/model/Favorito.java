package br.com.tcc.api.produto.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Favorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "areadelazer_id", nullable = false)
    private Lazer areaDeLazer;

    @ManyToOne
    @JoinColumn(name = "evento_id", nullable = false)
    private Eventos evento;

}






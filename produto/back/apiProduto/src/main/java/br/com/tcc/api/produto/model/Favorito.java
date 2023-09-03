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
    @JoinColumn(name = "idUsuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "areadelazer_id", nullable = false)
    private Lazer Lazer;


}






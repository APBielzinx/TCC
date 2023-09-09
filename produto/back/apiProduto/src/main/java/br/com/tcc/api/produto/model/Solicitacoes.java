package br.com.tcc.api.produto.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Solicitacoes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSolicitacoes;

    @Column(nullable = false, unique = true )
    private String email;
    @Column(nullable = false )
    private String senha;
    @Column(nullable = false)
    private int status;
    @ManyToOne
    @JoinColumn(name = "idLazer", nullable = false)
    private Lazer lazer;





}

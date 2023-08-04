package br.com.tcc.apiproduto.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class GerenciadorDoSistema{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idGerenSistema;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String senha;

    @Column(nullable = false)
    private String email;


}

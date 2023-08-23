package br.com.tcc.api.produto.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Administrador extends Pessoa{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAdm;

    @Column(nullable = false, unique = true )
    private String cnpj;

    @Column(nullable = false )
    private int tipo;






}

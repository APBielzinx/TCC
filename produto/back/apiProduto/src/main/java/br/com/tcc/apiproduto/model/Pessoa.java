package br.com.tcc.apiproduto.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public abstract class Pessoa {


    private String nome;
    private String email;
    private String senha;



}

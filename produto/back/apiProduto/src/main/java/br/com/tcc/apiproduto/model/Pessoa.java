package br.com.tcc.apiproduto.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@MappedSuperclass
@Data
@AllArgsConstructor
@NoArgsConstructor

public  class Pessoa {



    private String nome;

    private String email;

    private String senha;



}

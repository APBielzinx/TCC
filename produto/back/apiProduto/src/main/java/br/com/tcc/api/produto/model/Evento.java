package br.com.tcc.api.produto.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEvento;

    @Column(nullable = false)
    private String nomeEvento;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private String local ;

    @Column(nullable = false)
    private LocalDate dataInicio;

    @Column(nullable = false)
    private LocalDate dataTermino;

    @Column(nullable = false)
    private String horaInicio ;

    @Column(nullable = false)
    private String horaTermino ;

    @Column(nullable = false)
    private int status;

    @Column(nullable = false)
    private String imagem;

    @OneToMany(mappedBy = "evento", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonManagedReference
    @ToString.Exclude
    private List<Usuario> usuarios;

    @ManyToOne
    @JoinColumn (name = "idLazer")
    @JsonBackReference
    private Lazer lazer;


    public void removerUsuario(Usuario usuario) {
        if (usuarios != null) {
            usuarios.remove(usuario);
            usuario.setEvento(null);
        }
    }


}

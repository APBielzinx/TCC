package br.com.tcc.api.produto.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Usuario implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUsuario;
    @Column(nullable = false, unique = true )
    private String nome;
    @Column(nullable = false, unique = true )
    private String cep;
    @Column(nullable = false, unique = true )
    private String bairro;
    @Column(nullable = false, unique = true )
    private String localidade;
    @Column(nullable = false, unique = true )
    private String logradouro;
    @Column(nullable = false, unique = true )
    private String latitude ;
    @Column(nullable = false, unique = true )
    private String longetude;
    @Column(nullable = false, unique = true )
    private String uf;
    @Column(nullable = false, unique = true )
    private String email;
    @Column(nullable = false )
    private String senha;
    private UserRole role;

    @ManyToOne
    @JoinColumn(name = "idEvento")
    @JsonBackReference
    private Evento evento;

    public Usuario(String login, String password, UserRole role){
        this.email = login;
        this.senha = password;
        this.role = role;
    }



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
       return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }


    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    public void removerEvento() {
        if (evento != null) {
            evento.getUsuarios().remove(this);
            evento = null;
        }
    }
}

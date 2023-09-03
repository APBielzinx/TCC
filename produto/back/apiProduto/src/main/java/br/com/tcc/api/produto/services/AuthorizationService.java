package br.com.tcc.api.produto.services;

import br.com.tcc.api.produto.repository.AdministradorRepository;
import br.com.tcc.api.produto.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService implements UserDetailsService {

    @Autowired
    AdministradorRepository administradorRepository;

    @Autowired
    UsuarioRepository usuarioRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (administradorRepository.existsByEmail(username)){
           return administradorRepository.findByEmail(username);
        }else if (usuarioRepository.existsByEmail(username)){
            return usuarioRepository.findByEmail(username);
        }else {
            return (UserDetails) new UsernameNotFoundException(username);

        }

    }
}
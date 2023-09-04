package br.com.tcc.api.produto.security;

import br.com.tcc.api.produto.repository.AdministradorRepository;
import br.com.tcc.api.produto.repository.UsuarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    @Autowired
    TokenService tokenService;
    @Autowired
    UsuarioRepository userRepository;
    @Autowired
    AdministradorRepository administradorRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var token = this.recoverToken(request);
        if(token != null){
            var login = tokenService.validateToken(token);
            System.out.println(tokenService.validateToken(token));
            System.out.println(login);
           var user = userRepository.findByEmail(login);
            var userADM = administradorRepository.findByEmail(login);
            System.out.println(userADM);
            if (user == null){
             System.out.println("usuario não existe ");
                if (userADM == null){
                    System.out.println("administrador não existe ");
                }
            }


            assert user != null;
            var authentication = new UsernamePasswordAuthenticationToken(user, null, userADM.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

    private String recoverToken(HttpServletRequest request){
        var authHeader = request.getHeader("Authorization");
        if(authHeader == null) return null;
        return authHeader.replace("Bearer ", "");
    }
}

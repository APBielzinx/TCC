package br.com.tcc.api.produto.services;

import br.com.tcc.api.produto.model.Evento;
import br.com.tcc.api.produto.model.Lazer;
import br.com.tcc.api.produto.model.Usuario;
import br.com.tcc.api.produto.repository.EventoRepository;
import br.com.tcc.api.produto.repository.LazerRepository;
import br.com.tcc.api.produto.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private LazerRepository lazerRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;


    public List<Evento> ListarEvento(){

         return eventoRepository.findAll();

    }

    public ResponseEntity<?> BuscarEventoPorLazer(long id){
        var lazer = lazerRepository.findByIdLazer(id);
        List<Evento> evento = eventoRepository.findByLazer(lazer);

        return new ResponseEntity<>(evento, HttpStatus.OK);
    }
    public ResponseEntity<?> BuscarEventoPorIdUsuario(long id){
        var usuario = usuarioRepository.findByIdUsuario(id);
        List<Evento> evento = eventoRepository.findByUsuarios(usuario);

        return new ResponseEntity<>(evento, HttpStatus.OK);
    }
    public ResponseEntity<?> BuscarEventoPorData(String data){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(data,formatter);
        System.out.println(date);
        List<Evento> evento = eventoRepository.findByDataInicio(date);
        System.out.println(evento);

        return new ResponseEntity<>(evento, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> queroIr(Evento evento, Long idUsuario) {
        try {
            Optional<Usuario> usuarioOptional = usuarioRepository.findById(idUsuario);

            if (usuarioOptional.isEmpty()) {
                return new ResponseEntity<>("Usuário não encontrado", HttpStatus.BAD_REQUEST);
            }

            Usuario usuario = usuarioOptional.get();

            if (eventoRepository.existsByIdEventoAndUsuarios(evento.getIdEvento(), usuario)) {
                return new ResponseEntity<>("Você já adicionou esse evento ao quero ir", HttpStatus.BAD_REQUEST);
            }

            var eventoExistente = eventoRepository.findByIdEvento(evento.getIdEvento());

            if (eventoExistente != null) {
                eventoExistente.getUsuarios().add(usuario);
                usuario.setEvento(evento);
                usuarioRepository.save(usuario);
                eventoRepository.save(eventoExistente);
                return new ResponseEntity<>("Quero ir adicionado com sucesso", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("Evento não encontrado", HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>("Houve um problema ao criar o evento" + e, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> CriarNovoEvento(Evento evento){
         System.out.println((evento));
        try{
            eventoRepository.save(evento);
            return new ResponseEntity<>("Evento criado com sucesso", HttpStatus.CREATED);

        }catch (Exception e){
            System.out.println(e);
            return new ResponseEntity<>("Houve um problema ao criar o evento"+e, HttpStatus.BAD_REQUEST);

        }

    }

    public ResponseEntity<?> AtualizarEvento(Evento evento){
        try{

           var e =  eventoRepository.findByIdEvento(evento.getIdEvento());

           e.setNomeEvento(evento.getNomeEvento());
           e.setLocal(evento.getLocal());
           e.setDataInicio(evento.getDataInicio());
           e.setDataTermino(evento.getDataTermino());
           e.setDescricao(evento.getDescricao());
           e.setHoraInicio(evento.getHoraInicio());
           e.setHoraTermino(evento.getHoraTermino());
           if (evento.getImagem() == null || evento.getImagem().equals("")){
               e.setImagem(e.getImagem());
               eventoRepository.save(e);
           }
           e.setImagem(evento.getImagem());
           eventoRepository.save(e);

            return new ResponseEntity<>("Evento atualizado com sucesso",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Não foi possivel realizar a solicitação",HttpStatus.BAD_REQUEST);
        }
    }

   public ResponseEntity<?> deletarEvento(Long id){

       var evento = eventoRepository.findByIdEvento(id);

       // Assuming evento has a reference to usuario
       usuarioRepository.removerReferenciaEvento(id);

       // Agora você pode excluir o evento com segurança
       eventoRepository.delete(evento);
        return new ResponseEntity<>("evento deletado",HttpStatus.NO_CONTENT);

    }
    public ResponseEntity<?> deletarUsuarioDoevento(Long idUsuario, Long idEvento) {
        Optional<Evento> optionalEvento = eventoRepository.findById(idEvento);
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(idUsuario);

        if (optionalEvento.isPresent() && optionalUsuario.isPresent()) {
            Evento evento = optionalEvento.get();
            Usuario usuario = optionalUsuario.get();

            evento.removerUsuario(usuario);
            usuario.removerEvento();

            eventoRepository.save(evento);

            return new ResponseEntity<>("Usuário removido do evento", HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>("Usuário ou evento não encontrado", HttpStatus.NOT_FOUND);
        }
    }

}

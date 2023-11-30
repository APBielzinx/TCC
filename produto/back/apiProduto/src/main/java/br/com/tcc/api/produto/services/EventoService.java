package br.com.tcc.api.produto.services;

import br.com.tcc.api.produto.model.Evento;
import br.com.tcc.api.produto.model.Lazer;
import br.com.tcc.api.produto.repository.EventoRepository;
import br.com.tcc.api.produto.repository.LazerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private LazerRepository lazerRepository;

    public List<Evento> ListarEvento(){

         return eventoRepository.findAll();

    }

    public ResponseEntity<?> BuscarEventoPorLazer(long id){
        var lazer = lazerRepository.findByIdLazer(id);
        List<Evento> evento = eventoRepository.findByLazer(lazer);

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

        var e = eventoRepository.findByIdEvento(id);
        eventoRepository.delete(e);
        return new ResponseEntity<>("evento deletado",HttpStatus.NO_CONTENT);

    }


}

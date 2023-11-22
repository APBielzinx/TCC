package br.com.tcc.api.produto.services;

import br.com.tcc.api.produto.model.Avaliacao;
import br.com.tcc.api.produto.model.Usuario;
import br.com.tcc.api.produto.repository.AvaliacaoRepository;
import br.com.tcc.api.produto.repository.LazerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private LazerRepository lazerRepository;

    public List<Avaliacao> ListarAvaliacao(){
        return avaliacaoRepository.findAll();
    }

    public ResponseEntity<?> BuscarId(Long id){
        avaliacaoRepository.findById(id);
        return new ResponseEntity<>("Avaliação encontrada com sucesso", HttpStatus.OK);
    }
    public ResponseEntity<?> BuscarIdParque(Long id){
      var parque =  lazerRepository.findByIdLazer(id);
      List<Avaliacao> avaliacao = avaliacaoRepository.findByLazer(parque);
        return new ResponseEntity<>(avaliacao, HttpStatus.OK);
    }
    public ResponseEntity<?> Avaliar(Avaliacao avaliacao){
        if (avaliacaoRepository.existsByUsuarioAndAndLazer(avaliacao.getUsuario(), avaliacao.getLazer()) ) {
            return new ResponseEntity<>("Já existe uma avaliação deste usuario", HttpStatus.BAD_REQUEST);
        } else{
                avaliacao.setDataAvaliacao(LocalDate.now());
                avaliacaoRepository.save(avaliacao);
                return new ResponseEntity<>("Avaliação foi criada com sucesso", HttpStatus.OK);
            }
        }


    public ResponseEntity<?> AtualizarAvaliacao(Avaliacao avaliacao){
        if (avaliacaoRepository.existsById(avaliacao.getId())){
            var select = avaliacaoRepository.findByUsuario(avaliacao.getUsuario());
            select.setPontuacao(avaliacao.getPontuacao());
            select.setDataAvaliacao(avaliacao.getDataAvaliacao());
            select.setComentario(avaliacao.getComentario());
            return new ResponseEntity<>("Avaliação atualizada com sucesso", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Não existe nenhuma avaliação para ser atualizada", HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<?> RetirarAvaliacao(Avaliacao avaliacao){
        if (avaliacaoRepository.existsById(avaliacao.getId())){
            avaliacaoRepository.delete(avaliacao);
            return new ResponseEntity<>("Avaliação retirada com sucesso", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Não existe nenhuma avaliação deste usuario", HttpStatus.BAD_REQUEST);
        }
    }

}

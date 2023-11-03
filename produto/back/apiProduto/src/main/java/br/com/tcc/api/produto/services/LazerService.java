package br.com.tcc.api.produto.services;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.model.Lazer;
import br.com.tcc.api.produto.model.Solicitacoes;
import br.com.tcc.api.produto.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LazerService {
    @Autowired
    LazerRepository lazerRepository;

    @Autowired
    AvaliacaoRepository avaliacaoRepository;

    @Autowired
    FavoritoRepository favoritoRepository;

    @Autowired
    SolicitacoesRepository solicitacoesRepository;

    @Autowired
    AdministradorRepository administradorRepository;

    public List<Lazer> buscarTudo() {
        return lazerRepository.findAll();

    }
    public List<Lazer> buscarLazer() {
        return lazerRepository.findAllByCategoria("lazer");
    }

    public List<Lazer> buscarParque() {
        return lazerRepository.findAllByCategoria("parque");
    }

    public ResponseEntity<?> BuscarPorId(Long id) {
        var lazer = lazerRepository.findById(id);
        return new ResponseEntity<>(lazer, HttpStatus.OK);
    }

    public ResponseEntity<?> Cadastrar(Lazer lazer) {
        if (lazerRepository.existsByNome(lazer.getNome())) {

            return new ResponseEntity<>("Já existe uma area de lazer com esse nome", HttpStatus.BAD_REQUEST);

        } else {
            lazer.setNome(lazer.getNome());
            lazer.setEndereco(lazer.getEndereco());
            lazerRepository.save(lazer);
            return new ResponseEntity<>("Cadastrado com sucesso", HttpStatus.CREATED);


        }
    }

    public ResponseEntity<?> AtualizarLazer(Lazer lazer) {
        if (lazerRepository.existsByIdLazer(lazer.getIdLazer())) {
            var select = lazerRepository.findByIdLazer(lazer.getIdLazer());
            select.setNome(lazer.getNome());
            select.setEndereco(lazer.getEndereco());
            select.setImagem(lazer.getImagem());
            select.setDescricao(lazer.getDescricao());
            select.setLatitude(lazer.getLatitude());
            select.setLongetude(lazer.getLongetude());
            select.setCategoria(lazer.getCategoria());
            lazerRepository.save(select);
            return new ResponseEntity<>("atualizado com sucesso", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Area de Lazer não encontrada", HttpStatus.NO_CONTENT);
        }
    }

    public ResponseEntity<?> ExcluirLazer(Long id) {
        if (lazerRepository.existsByIdLazer(id)) {
           var lazer = lazerRepository.findByIdLazer(id);
           var avaliacao = avaliacaoRepository.findByLazer(lazer);
           var favorito = favoritoRepository.findByLazer(lazer);
           var solicitacoes = solicitacoesRepository.findByLazer(lazer);
           var adm = administradorRepository.findByLazer(lazer);
           if (avaliacao != null && favorito != null && solicitacoes != null){
               avaliacaoRepository.delete(avaliacao);
               favoritoRepository.delete(favorito);
               solicitacoesRepository.deleteAllByLazer(lazer);
               lazerRepository.delete(lazer);
           }else if (avaliacao != null ){
               avaliacaoRepository.delete(avaliacao);
               lazerRepository.delete(lazer);
           }else if (favorito != null ){
               favoritoRepository.delete(favorito);
               lazerRepository.delete(lazer);
           }else if(solicitacoes != null ) {
               solicitacoesRepository.deleteAllByLazer(lazer);
               lazerRepository.delete(lazer);
           }else if(adm != null){
               List<Administrador> administradoresParaExcluir = adm;
               for (Administrador administrador : administradoresParaExcluir) {
                   administradorRepository.delete(administrador);
               }

               lazerRepository.delete(lazer);
           }
           else {
               lazerRepository.delete(lazer);
           }

            return new ResponseEntity<>("deletado com sucesso", HttpStatus.OK);

        } else {

            return new ResponseEntity<>("Area de lazer não encontrada", HttpStatus.NO_CONTENT);

        }
    }


}

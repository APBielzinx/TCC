package br.com.tcc.api.produto.services;

import br.com.tcc.api.produto.model.Administrador;
import br.com.tcc.api.produto.model.Avaliacao;
import br.com.tcc.api.produto.model.Lazer;
import br.com.tcc.api.produto.model.Solicitacoes;
import br.com.tcc.api.produto.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

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

    @Transactional
    public ResponseEntity<?> Cadastrar(Lazer lazer) {
        if (lazerRepository.existsByNome(lazer.getNome())) {

            return new ResponseEntity<>("Já existe uma area de lazer com esse nome", HttpStatus.BAD_REQUEST);
        } else {
           
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
            select.setBairro(lazer.getBairro());
            select.setCep(lazer.getCep());
            select.setUf(lazer.getUf());
            select.setLocalidade(lazer.getLocalidade());
            lazerRepository.save(select);
            return new ResponseEntity<>("atualizado com sucesso", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Area de Lazer não encontrada", HttpStatus.NO_CONTENT);
        }
    }

  @Transactional
public ResponseEntity<?> excluirLazer(Long id) {
    Optional<Lazer> lazerOptional = Optional.ofNullable(lazerRepository.findByIdLazer(id));

    if (lazerOptional.isPresent()) {
        Lazer lazer = lazerOptional.get();

        avaliacaoRepository.deleteByLazer(lazer);
        favoritoRepository.deleteByLazer(lazer);
        solicitacoesRepository.deleteAllByLazer(lazer);
        administradorRepository.deleteByLazer(lazer);

        lazerRepository.delete(lazer);

        return new ResponseEntity<>("Deletado com sucesso", HttpStatus.OK);
    } else {
        return new ResponseEntity<>("Área de lazer não encontrada", HttpStatus.NO_CONTENT);
    }
}



    public ResponseEntity<?> BuscarPorIdAdm(Long id) {
       var adm =  administradorRepository.findByIdAdm(id);
      var lazer =  lazerRepository.findByAdministradores(adm);
      System.out.println("a"+lazer);
        return new ResponseEntity<>(lazer, HttpStatus.OK);


    }
}

package br.com.tcc.api.produto.services;

import br.com.tcc.api.produto.model.Solicitacoes;
import br.com.tcc.api.produto.repository.SolicitacoesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolicitacoesService {

    @Autowired
    SolicitacoesRepository solicitacoesRepository;

    BCryptPasswordEncoder criptografar = new BCryptPasswordEncoder();

    public List<Solicitacoes> buscarTodasSolicitacoes(){

        return solicitacoesRepository.findAll();

    }

    public ResponseEntity<?> buscarSolicitacoesPorId(long id){

     var solicitacao = solicitacoesRepository.findByIdSolicitacoes(id);

     if (solicitacao == null){
         return new ResponseEntity<>("Solicitação não encontrada",HttpStatus.NO_CONTENT);

     }else {

         return new ResponseEntity<>(solicitacao, HttpStatus.OK);

     }
    }

    public ResponseEntity<?> cadastar(Solicitacoes solicitacoes){
        if (solicitacoesRepository.existsByEmail(solicitacoes.getEmail())){

            return new ResponseEntity<>("Você já enviou uma solicitação para esse email", HttpStatus.BAD_REQUEST);

        }else {
            solicitacoesRepository.save(solicitacoes);
            return new ResponseEntity<>("Cadastrado com sucesso", HttpStatus.CREATED);
        }
    }

    public ResponseEntity<?> atualizar(Solicitacoes solicitacoes){

        if (solicitacoesRepository.existsByEmail(solicitacoes.getEmail())){

            var select = solicitacoesRepository.findByEmail(solicitacoes.getEmail());
            select.setEmail(solicitacoes.getEmail());
            String senhaCriptografada = criptografar.encode(solicitacoes.getSenha());
            select.setSenha(senhaCriptografada);
            select.setStatus(solicitacoes.getStatus());
            select.setLazer(solicitacoes.getLazer());
            solicitacoesRepository.save(select);
            return new ResponseEntity<>("salvo com sucesso", HttpStatus.OK);

        }else {
            return new ResponseEntity<>("Solicitação não encontrada", HttpStatus.NO_CONTENT);

        }

    }

    public ResponseEntity<?> deletar(Solicitacoes solicitacoes){

        if (solicitacoesRepository.existsByEmail(solicitacoes.getEmail())){
            solicitacoesRepository.delete(solicitacoes);
            return new ResponseEntity<>("salvo com sucesso", HttpStatus.OK);
        }else {
            return new ResponseEntity<>("Solicitação não encontrada", HttpStatus.NO_CONTENT);
        }

    }

}


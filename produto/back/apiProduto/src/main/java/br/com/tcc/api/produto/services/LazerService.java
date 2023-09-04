package br.com.tcc.api.produto.services;

import br.com.tcc.api.produto.model.Lazer;
import br.com.tcc.api.produto.repository.LazerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LazerService {
    @Autowired
    LazerRepository lazerRepository;

    public List<Lazer> buscarLazer() {
        return lazerRepository.findAll();
    }

    public ResponseEntity<?> BuscarPorId(Long id){
        lazerRepository.findById(id);
        return new ResponseEntity<>("Encontrado com sucesso", HttpStatus.OK);
    }

    public ResponseEntity<?> Cadastrar(Lazer lazer){
        if (lazerRepository.existsByNome(lazer.getNome())) {

            return new ResponseEntity<>("Já existe uma area de lazer com esse nome", HttpStatus.BAD_REQUEST);

        }
        else {
            lazer.setNome(lazer.getNome());
            lazer.setEndereco(lazer.getEndereco());

            return new ResponseEntity<>("Cadastrado com sucesso", HttpStatus.CREATED);


        }
    }

    public ResponseEntity<?> AtualizarLazer(Lazer lazer){
        if (lazerRepository.existsByNome(lazer.getNome())) {
            var select = lazerRepository.findByNome(lazer.getNome());
            select.setNome(lazer.getNome());
            select.setEndereco(lazer.getEndereco());


            lazerRepository.save(select);
            return new ResponseEntity<>("atualizado com sucesso", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Area de Lazer não encontrada", HttpStatus.NO_CONTENT);
        }
    }

    public ResponseEntity<?> ExcluirLazer(Lazer lazer){
        if (lazerRepository.existsByNome(lazer.getNome())){

            lazerRepository.delete(lazer);

            return new ResponseEntity<>("deletado com sucesso", HttpStatus.OK);

        }else {

            return new ResponseEntity<>("Area de lazer não encontrada", HttpStatus.NO_CONTENT);

        }
    }


}

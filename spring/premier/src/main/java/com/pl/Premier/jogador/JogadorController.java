package com.pl.Premier.jogador;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/jogadores")
@CrossOrigin(origins = "http://localhost:3000")
public class JogadorController {

    private final JogadorService jogadorService;

    @Autowired
    public JogadorController(JogadorService jogadorService) {
        this.jogadorService = jogadorService;
    }

    @GetMapping
    public List<Jogador> getJogadores(
            @RequestParam(required = false) String time,
            @RequestParam(required = false) String nome,
            @RequestParam(required = false) String posicao,
            @RequestParam(required = false) String nacionalidade) {

        return jogadorService.filtrar(time, nome, posicao, nacionalidade);
    }

    @PostMapping
    public ResponseEntity<Jogador> addJogador (@RequestBody Jogador jogador){
        Jogador jogadorCriado = jogadorService.addjogador(jogador);
        return new ResponseEntity<>(jogadorCriado, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Jogador> updateJogador (@RequestBody Jogador jogador){
        Jogador jogadorAtualizado = jogadorService.atualizarJogador(jogador);
        if (jogadorAtualizado != null){
            return new ResponseEntity<>(jogadorAtualizado, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{jogadorNome}")
    public ResponseEntity<String> deleteJogador (@PathVariable String jogadorNome){
        jogadorService.deleteJogador(jogadorNome);
        return new ResponseEntity<>("Jogador deletado com sucesso!", HttpStatus.OK);
    }
}
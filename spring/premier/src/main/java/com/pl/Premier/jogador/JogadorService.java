package com.pl.Premier.jogador;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class JogadorService {

    private final JogadorRepository jogadorRepository;

    @Autowired
    public JogadorService(JogadorRepository jogadorRepository) {
        this.jogadorRepository = jogadorRepository;
    }

    public List<Jogador> getJogadores() {
        return jogadorRepository.findAll();
    }

    // filtro
    public List<Jogador> filtrar(String time, String nome, String posicao, String nacionalidade) {
        return jogadorRepository.findAll().stream()
                .filter(j -> time == null || safeEquals(j.getTimeNome(), time))
                .filter(j -> nome == null || safeContains(j.getNome(), nome))
                .filter(j -> posicao == null || safeEquals(j.getPosicao(), posicao))
                .filter(j -> nacionalidade == null ||
                        normalizar(j.getNacionalidade()).contains(normalizar(nacionalidade)))
                .collect(Collectors.toList());
    }


    // crud
    public Jogador addjogador(Jogador jogador) {
        return jogadorRepository.save(jogador);
    }

    public Jogador atualizarJogador(Jogador jogador) {
        Optional<Jogador> jogadorExistente = jogadorRepository.findByNome(jogador.getNome());

        if (jogadorExistente.isPresent()) {
            Jogador jogadorToUpdate = jogadorExistente.get();

            jogadorToUpdate.setNome(jogador.getNome());
            jogadorToUpdate.setTimeNome(jogador.getTimeNome());
            jogadorToUpdate.setPosicao(jogador.getPosicao());
            jogadorToUpdate.setNacionalidade(jogador.getNacionalidade());
            jogadorToUpdate.setIdade(jogador.getIdade());

            return jogadorRepository.save(jogadorToUpdate);
        }

        return null;
    }

    @Transactional
    public void deleteJogador(String jogadorNome) {
        jogadorRepository.deleteByNome(jogadorNome);
    }


    // metodos

    private boolean safeEquals(String a, String b) {
        return a != null && b != null && a.equalsIgnoreCase(b);
    }

    private boolean safeContains(String a, String b) {
        return a != null && b != null && a.toLowerCase().contains(b.toLowerCase());
    }

    private String normalizar(String texto) {
        if (texto == null) return "";
        return texto
                .toLowerCase()
                .replaceAll("[^a-z]", "")
                .trim();
    }
}

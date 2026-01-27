package com.pl.Premier.jogador;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JogadorRepository extends JpaRepository<Jogador, String> {

    void deleteByNome(String jogadorNome);
    Optional<Jogador> findByNome(String Nome);
    List<Jogador> findByPosicaoContainingIgnoreCase(String posicao);
}

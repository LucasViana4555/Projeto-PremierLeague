package com.pl.Premier.jogador;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="jogador_estatistica")
public class Jogador {

    @Id
    @Column(name = "jogador_nome")
    private String nome;

    @Column(name = "nacionalidade")
    private String nacionalidade;

    @Column(name = "posicao")
    private String posicao;

    @Column(name = "idade")
    private Integer idade;

    @Column(name = "partidas_jogadas")
    private Integer partidasJogadas;

    @Column(name = "iniciadas")
    private Integer iniciadas;

    @Column(name = "minutos_jogados")
    private Double minutosJogados;

    @Column(name = "gols")
    private Double gols;

    @Column(name = "assistencias")
    private Double assistencias;

    @Column(name = "penaltis_marcados")
    private Double penaltisMarcados;

    @Column(name = "cartoes_amarelos")
    private Double cartoesAmarelos;

    @Column(name = "cartoes_vermelhos")
    private Double cartoesVermelhos;

    @Column(name = "gols_esperados")
    private Double golsEsperados;

    @Column(name = "assistencias_esperadas")
    private Double assistenciasEsperadas;

    @Column(name = "time_nome")
    private String timeNome;


    public Jogador() {
    }

    public Jogador(String nome) {
        this.nome = nome;
    }


    public Jogador(String nome, String nacionalidade, String posicao, Integer idade, Integer partidasJogadas, Integer iniciadas, Double minutosJogados, Double gols, Double assistencias, Double penaltisMarcados, Double cartoesAmarelos, Double cartoesVermelhos, Double golsEsperados, Double assistenciasEsperadas, String timeNome) {
        this.nome = nome;
        this.nacionalidade = nacionalidade;
        this.posicao = posicao;
        this.idade = idade;
        this.partidasJogadas = partidasJogadas;
        this.iniciadas = iniciadas;
        this.minutosJogados = minutosJogados;
        this.gols = gols;
        this.assistencias = assistencias;
        this.penaltisMarcados = penaltisMarcados;
        this.cartoesAmarelos = cartoesAmarelos;
        this.cartoesVermelhos = cartoesVermelhos;
        this.golsEsperados = golsEsperados;
        this.assistenciasEsperadas = assistenciasEsperadas;
        this.timeNome = timeNome;
    }


    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNacionalidade() {
        return nacionalidade;
    }

    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
    }

    public String getPosicao() {
        return posicao;
    }

    public void setPosicao(String posicao) {
        this.posicao = posicao;
    }

    public Integer getIdade() {
        return idade;
    }

    public void setIdade(Integer idade) {
        this.idade = idade;
    }

    public Integer getPartidasJogadas() {
        return partidasJogadas;
    }

    public void setPartidasJogadas(Integer partidasJogadas) {
        this.partidasJogadas = partidasJogadas;
    }

    public Integer getIniciadas() {
        return iniciadas;
    }

    public void setIniciadas(Integer iniciadas) {
        this.iniciadas = iniciadas;
    }

    public Double getMinutosJogados() {
        return minutosJogados;
    }

    public void setMinutosJogados(Double minutosJogados) {
        this.minutosJogados = minutosJogados;
    }

    public Double getGols() {
        return gols;
    }

    public void setGols(Double gols) {
        this.gols = gols;
    }

    public Double getAssistencias() {
        return assistencias;
    }

    public void setAssistencias(Double assistencias) {
        this.assistencias = assistencias;
    }

    public Double getPenaltisMarcados() {
        return penaltisMarcados;
    }

    public void setPenaltisMarcados(Double penaltisMarcados) {
        this.penaltisMarcados = penaltisMarcados;
    }

    public Double getCartoesAmarelos() {
        return cartoesAmarelos;
    }

    public void setCartoesAmarelos(Double cartoesAmarelos) {
        this.cartoesAmarelos = cartoesAmarelos;
    }

    public Double getCartoesVermelhos() {
        return cartoesVermelhos;
    }

    public void setCartoesVermelhos(Double cartoesVermelhos) {
        this.cartoesVermelhos = cartoesVermelhos;
    }

    public Double getGolsEsperados() {
        return golsEsperados;
    }

    public void setGolsEsperados(Double golsEsperados) {
        this.golsEsperados = golsEsperados;
    }

    public Double getAssistenciasEsperadas() {
        return assistenciasEsperadas;
    }

    public void setAssistenciasEsperadas(Double assistenciasEsperadas) {
        this.assistenciasEsperadas = assistenciasEsperadas;
    }

    public String getTimeNome() {
        return timeNome;
    }

    public void setTimeNome(String timeNome) {
        this.timeNome = timeNome;
    }
}
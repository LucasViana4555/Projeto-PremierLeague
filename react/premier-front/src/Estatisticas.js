import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import './App.css';
import Flag from 'react-world-flags';

function Estatisticas({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const [jogadores, setJogadores] = useState([]);
  const [times, setTimes] = useState([]);
  const [posicoes, setPosicoes] = useState([]);
  const [nacionalidades, setNacionalidades] = useState([]);
  const [filtros, setFiltros] = useState({ nome: '', time: '', posicao: '', nacionalidade: '' });

  const estadoInicialJogador = {
    nome: '', timeNome: '', posicao: '', nacionalidade: '', idade: 0,
    partidasJogadas: 0, minutosJogados: 0, gols: 0, assistencias: 0,
    penaltisMarcados: 0, iniciadas: 0, golsEsperados: 0, assistenciasEsperadas: 0,
    cartoesAmarelos: 0, cartoesVermelhos: 0
  };

  const [novoJogador, setNovoJogador] = useState(estadoInicialJogador);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(false);

  const formatarNomeNacao = (nac) => {
    if (!nac) return "";
    const mapaNomes = {
      'br BRA': 'Brasil', 'ar ARG': 'Argentina', 'fr FRA': 'França', 'pt POR': 'Portugal',
      'es ESP': 'Espanha', 'eng ENG': 'Inglaterra', 'de GER': 'Alemanha', 'it ITA': 'Itália',
      'sct SCO': 'Escócia', 'wls WAL': 'País de Gales', 'nir NIR': 'Irlanda do Norte',
      'no NOR': 'Noruega', 'ch SUI': 'Suíça', 'ALB': 'Albânia', 'AUT': 'Áustria',
      'AUS': 'Austrália', 'BIH': 'Bósnia', 'BEL': 'Bélgica', 'COD': 'Congo',
      'CIV': 'Costa do Marfim', 'CMR': 'Camarões', 'COL': 'Colômbia', 'CZE': 'Chéquia',
      'DEN': 'Dinamarca', 'ALG': 'Argélia', 'ECU': 'Equador', 'EST': 'Estônia',
      'EGY': 'Egito', 'FIN': 'Finlândia', 'GAB': 'Gabão', 'GRN': 'Granada',
      'GHA': 'Gana', 'GUI': 'Guiné', 'GRE': 'Grécia', 'CRO': 'Croácia',
      'IRL': 'Irlanda', 'ISR': 'Israel', 'IRQ': 'Iraque', 'IRN': 'Irã',
      'JAM': 'Jamaica', 'JPN': 'Japão', 'KOR': 'Coreia do Sul', 'LBR': 'Libéria',
      'MAR': 'Marrocos', 'MNE': 'Montenegro', 'MLI': 'Mali', 'MSR': 'Montserrat',
      'MEX': 'México', 'NGA': 'Nigéria', 'NED': 'Holanda', 'NZL': 'Nova Zelândia',
      'POL': 'Polônia', 'PAR': 'Paraguai', 'SRB': 'Sérvia', 'SWE': 'Suécia',
      'SVK': 'Eslováquia', 'SEN': 'Senegal', 'TUN': 'Tunísia', 'TUR': 'Turquia',
      'UKR': 'Ucrânia', 'USA': 'EUA', 'URU': 'Uruguai', 'VEN': 'Venezuela',
      'ZAM': 'Zâmbia', 'ZIM': 'Zimbábue'
    };
    const sigla = nac.includes(' ') ? nac.split(' ')[1] : nac;
    return mapaNomes[nac] || mapaNomes[sigla] || sigla;
  };

  const filtrarDadosSujos = (data) => {
    return data.filter(j => j.nome && !j.nome.startsWith('Squad Total'));
  };

  const traduzirPosicao = (pos) => {
    if (!pos) return "";
    const mapaPosicoes = {
      'GK': 'GOL', 'DF': 'DEF', 'MF': 'MEI', 'FW': 'ATA',
      'DF,MF': 'ZAG/MEI', 'MF,DF': 'MEI/ZAG', 'MF,FW': 'MEI/ATA',
      'FW,MF': 'ATA/MEI', 'DF,FW': 'ZAG/ATA', 'FW,DF': 'ATA/ZAG',
    };
    return mapaPosicoes[pos] || pos;
  };

  const fetchJogadores = useCallback(async (novosFiltros = filtros) => {
    try {
      const params = {};
      if (novosFiltros.time) params.time = novosFiltros.time;
      if (novosFiltros.nome) params.nome = novosFiltros.nome;
      if (novosFiltros.posicao) params.posicao = novosFiltros.posicao;
      if (novosFiltros.nacionalidade) params.nacionalidade = novosFiltros.nacionalidade;

      const response = await api.get('', { params });
      setJogadores(filtrarDadosSujos(response.data));
    } catch (error) {
      console.error("Erro ao filtrar:", error);
    }
  }, [filtros]);

  const carregarDadosIniciais = useCallback(async () => {
    try {
      const response = await api.get(''); 
      const listaLimpa = filtrarDadosSujos(response.data);
      setJogadores(listaLimpa);
      setTimes([...new Set(listaLimpa.map(j => j.timeNome))].filter(Boolean).sort());
      setPosicoes([...new Set(listaLimpa.map(j => j.posicao))].filter(Boolean).sort());
      setNacionalidades([...new Set(listaLimpa.map(j => j.nacionalidade))].filter(Boolean).sort());
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }, []);

  useEffect(() => { carregarDadosIniciais(); }, [carregarDadosIniciais]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseFloat(value) || 0 : value;
    setNovoJogador(prev => ({ ...prev, [name]: val }));
  };

  const handleSaveJogador = async (e) => {
    e.preventDefault();
    try {
      if (editando) await api.put('', novoJogador);
      else await api.post('', novoJogador);
      fecharFormulario();
      carregarDadosIniciais();
      alert("Sucesso!");
    } catch (error) { console.error(error); }
  };

  const handleEditClick = (jogador) => {
    setNovoJogador(jogador);
    setEditando(true);
    setMostrarForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fecharFormulario = () => {
    setMostrarForm(false);
    setEditando(false);
    setNovoJogador(estadoInicialJogador);
  };

  const handleLimparFiltros = () => {
    const filtrosVazios = { nome: '', time: '', posicao: '', nacionalidade: '' };
    setFiltros(filtrosVazios);
    fetchJogadores(filtrosVazios);
  };

  const handleDeleteJogador = async (nome) => {
    if (window.confirm(`Excluir ${nome}?`)) {
      try {
        await api.delete(`/${nome}`); 
        carregarDadosIniciais();
      } catch (error) {
        console.error("Erro ao excluir:", error);
      }
    }
  };

  const handleChangeFiltro = (e) => {
    const { name, value } = e.target;
    const atualizados = { ...filtros, [name]: value };
    setFiltros(atualizados);
    if (name !== 'nome') fetchJogadores(atualizados);
  };

  const getCountryCode = (nacionalidade) => {
    if (!nacionalidade) return "";
    const parts = nacionalidade.split(" ");
    const code = parts[0].toLowerCase() === "br" ? "BR" : parts[0].toUpperCase();
    const specialCodes = { 'ENG': 'GB-ENG', 'SCT': 'GB-SCT', 'WLS': 'GB-WLS', 'NIR': 'GB-NIR' };
    return specialCodes[code] || code;
  };

  return (
    <div className="container">
      <div className="header-wrapper">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="btn-back-home" onClick={() => navigate('/')} title="Voltar ao Início">←</button>
          <header className="header"><h1>Premier League Estatísticas</h1></header>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <label className="theme-switch-wrapper" title="Alternar Tema">
            <input type="checkbox" className="theme-switch-input" checked={theme === 'dark'} onChange={toggleTheme} />
            <span className="theme-switch-slider">
              <span className="theme-switch-thumb">
                {theme === 'light' ? '☀️' : '🌙'}
              </span>
            </span>
          </label>
          <button className={`btn-add-main ${mostrarForm ? 'active' : ''}`} 
                  onClick={mostrarForm ? fecharFormulario : () => setMostrarForm(true)}>
            {mostrarForm ? '✕ Cancelar' : '+ Novo Jogador'}
          </button>
        </div>
      </div>

      {mostrarForm && (
        <div className="add-form-container">
          <form className="add-form-grid" onSubmit={handleSaveJogador}>
            <div className="form-field"><label>NOME</label><input name="nome" value={novoJogador.nome} onChange={handleInputChange} required readOnly={editando} /></div>
            <div className="form-field"><label>IDADE</label><input type="number" name="idade" value={novoJogador.idade} onChange={handleInputChange} required /></div>
            <div className="form-field"><label>TIME</label>
              <select name="timeNome" value={novoJogador.timeNome} onChange={handleInputChange} required>
                <option value="">Selecione...</option>
                {times.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-field"><label>POSIÇÃO</label>
              <select name="posicao" value={novoJogador.posicao} onChange={handleInputChange} required>
                <option value="">Selecione...</option>
                {posicoes.map(p => <option key={p} value={p}>{traduzirPosicao(p)}</option>)}
              </select>
            </div>
            <div className="form-field"><label>NACIONALIDADE</label>
              <select name="nacionalidade" value={novoJogador.nacionalidade} onChange={handleInputChange} required>
                <option value="">Selecione...</option>
                {nacionalidades.map(n => <option key={n} value={n}>{formatarNomeNacao(n)}</option>)}
              </select>
            </div>

            <div className="form-field"><label>PJ</label><input type="number" name="partidasJogadas" value={novoJogador.partidasJogadas} onChange={handleInputChange} /></div>
            <div className="form-field"><label>MIN</label><input type="number" name="minutosJogados" value={novoJogador.minutosJogados} onChange={handleInputChange} /></div>
            <div className="form-field"><label>GOLS</label><input type="number" name="gols" value={novoJogador.gols} onChange={handleInputChange} /></div>
            <div className="form-field"><label>PEN</label><input type="number" name="penaltisMarcados" value={novoJogador.penaltisMarcados} onChange={handleInputChange} /></div>
            <div className="form-field"><label>TIT</label><input type="number" name="iniciadas" value={novoJogador.iniciadas} onChange={handleInputChange} /></div>
            <div className="form-field"><label>AST</label><input type="number" name="assistencias" value={novoJogador.assistencias} onChange={handleInputChange} /></div>
            <div className="form-field"><label>xG</label><input type="number" step="0.1" name="golsEsperados" value={novoJogador.golsEsperados} onChange={handleInputChange} /></div>
            <div className="form-field"><label>xAG</label><input type="number" step="0.1" name="assistenciasEsperadas" value={novoJogador.assistenciasEsperadas} onChange={handleInputChange} /></div>
            <div className="form-field"><label>AMAR</label><input type="number" name="cartoesAmarelos" value={novoJogador.cartoesAmarelos} onChange={handleInputChange} /></div>
            <div className="form-field"><label>VERM</label><input type="number" name="cartoesVermelhos" value={novoJogador.cartoesVermelhos} onChange={handleInputChange} /></div>
            
            <button type="submit" className="btn-save">{editando ? 'ATUALIZAR' : 'SALVAR JOGADOR'}</button>
          </form>
        </div>
      )}

      <div className="filter-bar">
        <div className="filter-group"><label>Time</label>
          <select name="time" value={filtros.time} onChange={handleChangeFiltro}>
            <option value="">Todos os Times</option>
            {times.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="filter-group"><label>Posição</label>
          <select name="posicao" value={filtros.posicao} onChange={handleChangeFiltro}>
            <option value="">Todas as Posições</option>
            {posicoes.map(p => <option key={p} value={p}>{traduzirPosicao(p)}</option>)}
          </select>
        </div>
        <div className="filter-group"><label>Nacionalidade</label>
          <select name="nacionalidade" value={filtros.nacionalidade} onChange={handleChangeFiltro}>
            <option value="">Todas as Nações</option>
            {nacionalidades.map(n => <option key={n} value={n}>{formatarNomeNacao(n)}</option>)}
          </select>
        </div>
        <div className="filter-group"><label>Nome do Jogador</label>
          <input name="nome" placeholder="Buscar..." value={filtros.nome} onChange={handleChangeFiltro} />
        </div>
        <div className="filter-actions">
          <button className="btn-search" onClick={() => fetchJogadores()}>Buscar</button>
          <button className="btn-clear" onClick={handleLimparFiltros}>Limpar</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="fl-table">
          <thead>
            <tr>
              <th>Jogador</th><th>Time</th><th>Pos.</th><th>Nac.</th><th>Idade</th>
              <th>PJ</th><th>Min.</th><th>Gols</th><th>Pen.</th><th>Tit.</th>
              <th>Ast.</th><th>xG</th><th>xAG</th><th>Amarelos</th><th>Vermelhos</th><th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {jogadores.map((j, i) => (
              <tr key={i}>
                <td className="font-bold">{j.nome}</td>
                <td>{j.timeNome}</td>
                <td><span className="badge">{traduzirPosicao(j.posicao)}</span></td>
                <td className="flag-cell"><Flag code={getCountryCode(j.nacionalidade)} style={{ width: '25px' }} /></td>
                <td>{j.idade}</td>
                <td>{j.partidasJogadas}</td>
                <td>{j.minutosJogados}'</td>
                <td className="goals">{j.gols}</td>
                <td>{j.penaltisMarcados}</td>
                <td>{j.iniciadas}</td>
                <td className="assists">{j.assistencias}</td>
                <td>{j.golsEsperados}</td>
                <td>{j.assistenciasEsperadas}</td>
                <td className="yellow-card">{j.cartoesAmarelos}</td>
                <td className="red-card">{j.cartoesVermelhos}</td>
                <td className="actions-cell">
                  <button className="btn-edit" onClick={() => handleEditClick(j)}>Editar</button>
                  <button className="btn-delete" onClick={() => handleDeleteJogador(j.nome)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Estatisticas;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <img src="https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg" alt="Premier League" className="premier-logo" />
        <h1 className="home-title">
          Premier League <br />
          <span className="highlight">Estatísticas</span>
        </h1>
        <p className="home-subtitle">
          Explore dados detalhados, métricas avançadas (xG) e acompanhe 
          o desempenho dos maiores craques da liga mais competitiva do mundo.
        </p>
        <button className="btn-enter" onClick={() => navigate('/estatisticas')}>
          Acessar Estatísticas
        </button>
      </div>
      <div className="home-footer">
        Criado por Lucas Viana da Silva
      </div>
    </div>
  );
};

export default Home;
import { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.scss';

type Incident = {
  id: number;
  title: string;
  description: string;
  value: number;
}

export function Landing() {
  const history = useHistory();

  const ongId = localStorage.getItem('ong_id');
  const ongName = localStorage.getItem('ong_name');

  const [incidents, setIncidents] = useState<Incident[]>([]);

  useEffect(() => {
    api.get('ong/incidents', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    });
  }, [ongId]);

  async function handleDeleteIncident(id: number) {
    try {
      await api.delete(`incidents/${id}`, { 
        headers: {
          Authorization: ongId,
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert('Erro ao deletar o caso, tente novamente.');
    }
  };

  function handleLogout() {
    localStorage.removeItem('ong_id');
    localStorage.removeItem('ong_name');

    history.push('/');
  }

  return (
    <div className="landing-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />

        <span>Bem-vindo, {ongName}</span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>

        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        { incidents.map(incident => {
          return (
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

              <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          )
        }) }
      </ul>
    </div>
  );
}
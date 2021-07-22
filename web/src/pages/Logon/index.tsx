import { FormEvent, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import './styles.scss';

export function Logon() {
  const history = useHistory();

  const [id, setId] = useState('');

  async function handleLogon(event: FormEvent) {
    event.preventDefault();

    if (!id)
      return;

    try {
      const response = await api.post('sessions', { id });
    
      localStorage.setItem('ong_id', id);
      localStorage.setItem('ong_name', response.data.name);

      alert('Autenticado com sucesso!');

      history.push('/app');
    } catch (err) {
      alert('Erro ao realizar o logon, tente novamente.');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogon}>
          <h1>Faça seu logon</h1>

          <input 
            type="text" 
            placeholder="Sua ID"
            value={id}
            onChange={event => setId(event.target.value)}
          />

          <button type="submit" className="button">Entrar</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
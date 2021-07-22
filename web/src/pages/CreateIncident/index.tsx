import { FormEvent, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.scss';

export function CreateIncident() {
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ong_id');

  async function handleCreateIncident(event: FormEvent) {
    event.preventDefault();

    if (!title || !description || !value)
      return;
    
    const data = {
      title,
      description,
      value,
      ongId
    };

    try {
      await api.post('incidents', data, { 
        headers: {
          Authorization: ongId,
        } 
      });

      alert('Caso cadastrado com sucesso!');

      history.push('/app');
    } catch (err) {
      alert('Erro ao cadastrar o caso, tente novamente.')
    }
  }

  return (
    <div className="create-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link to="/app" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleCreateIncident}>
          <input 
            type="text" 
            placeholder="Título do caso"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />

          <textarea 
            placeholder="Descrição" 
            value={description}
            onChange={event => setDescription(event.target.value)}
          />

          <input 
            type="text" 
            placeholder="Valor em reais " 
            value={value}
            onChange={event => setValue(event.target.value)}
          />

          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
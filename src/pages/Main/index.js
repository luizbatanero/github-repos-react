import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Logo, Form, FormInput, SubmitButton, List } from './styles';

class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    isLoading: false,
    error: '',
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    } else {
      this.setState({
        repositories: [
          {
            name: 'twbs/bootstrap',
            ownerAvatar: 'https://avatars0.githubusercontent.com/u/2918581?v=4',
          },
        ],
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, error: false });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ isLoading: true });

    try {
      const { newRepo, repositories } = this.state;

      if (repositories.find(repo => repo.name === newRepo)) {
        throw new Error('Repositório duplicado');
      }

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
        ownerAvatar: response.data.owner.avatar_url,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        isLoading: false,
        error: '',
      });
    } catch (err) {
      this.setState({
        isLoading: false,
        error: err.message.includes('404')
          ? 'Repositório não encontrado'
          : err.message,
      });
    }
  };

  handleRemove = repositoryName => {
    this.setState(state => ({
      repositories: state.repositories.filter(
        repo => repo.name !== repositoryName
      ),
    }));
  };

  render() {
    const { newRepo, repositories, isLoading, error } = this.state;

    return (
      <Container>
        <Logo>
          <FaGithubAlt />
        </Logo>

        <Form onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
            isLoading={isLoading}
            error={error}
          />
          <SubmitButton isLoading={isLoading} disabled={!newRepo.length}>
            {isLoading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
          {error && <div className="error">{error}</div>}
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                <img src={repository.ownerAvatar} alt={repository.name} />
                <span>{repository.name}</span>
              </Link>
              <button
                type="button"
                onClick={() => this.handleRemove(repository.name)}
              >
                <FaTrashAlt />
              </button>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;

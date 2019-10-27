import React, { Component } from 'react';
import chroma from 'chroma-js';
import {
  FaArrowRight,
  FaArrowLeft,
  FaSpinner,
  FaStar,
  FaCodeBranch,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  Counters,
  IssueList,
  IssueFilter,
  FilterButton,
  Pagination,
} from './styles';

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    filter: 'all',
    issues: [],
    loading: true,
    page: 1,
    nextPage: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filter, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filter,
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      nextPage: Boolean(
        issues.headers.link && issues.headers.link.includes('next')
      ),
      loading: false,
    });
  }

  handleFilterChange = async filter => {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    this.setState({ filter, page: 1 });

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        per_page: 5,
        page: 1,
      },
    });

    this.setState({
      issues: issues.data,
      nextPage: Boolean(
        issues.headers.link && issues.headers.link.includes('next')
      ),
    });
  };

  handlePageChange = async page => {
    const { match } = this.props;
    const { filter } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filter,
        per_page: 5,
        page,
      },
    });

    this.setState({
      issues: issues.data,
      page,
      nextPage: Boolean(
        issues.headers.link && issues.headers.link.includes('next')
      ),
    });
  };

  render() {
    const { repository, issues, loading, filter, page, nextPage } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner />
        </Loading>
      );
    }

    return (
      <Container innerPage>
        <Owner>
          <Link to="/">
            <FaArrowLeft />
            <span>Back</span>
          </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
          <Counters>
            <span>
              <FaStar />
              {repository.stargazers_count}
            </span>
            <span>
              <FaCodeBranch />
              {repository.forks_count}
            </span>
          </Counters>
        </Owner>

        <IssueFilter>
          <FilterButton
            type="button"
            active={filter === 'all'}
            onClick={() => this.handleFilterChange('all')}
          >
            All Issues
          </FilterButton>
          <FilterButton
            type="button"
            active={filter === 'open'}
            onClick={() => this.handleFilterChange('open')}
          >
            Open
          </FilterButton>
          <FilterButton
            type="button"
            active={filter === 'closed'}
            onClick={() => this.handleFilterChange('closed')}
          >
            Closed
          </FilterButton>
        </IssueFilter>

        <IssueList>
          {!issues.length && (
            <p className="no-issues">There aren’t any issues.</p>
          )}
          {issues.map(issue => (
            <a
              href={issue.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key={String(issue.id)}
            >
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  {issue.title}
                  {issue.labels.map(label => (
                    <span
                      key={String(label.id)}
                      style={{
                        backgroundColor: `#${label.color}`,
                        color:
                          chroma(`#${label.color}`).get('lab.l') > 70
                            ? '#222'
                            : '#fff',
                      }}
                    >
                      {label.name}
                    </span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </a>
          ))}
        </IssueList>

        <Pagination>
          {page > 1 && (
            <button
              type="button"
              className="anterior"
              onClick={() => this.handlePageChange(page - 1)}
            >
              <FaArrowLeft />
            </button>
          )}
          {nextPage && (
            <button
              type="button"
              className="proximo"
              onClick={() => this.handlePageChange(page + 1)}
            >
              <FaArrowRight />
            </button>
          )}
        </Pagination>
      </Container>
    );
  }
}

export default Repository;

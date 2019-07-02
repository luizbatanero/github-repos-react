import styled, { css } from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueFilter = styled.div`
  display: flex;
  margin-top: 30px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;

export const FilterButton = styled.button`
  flex: 1;
  border: 0;
  padding: 15px 0;
  background: #fff;

  ${props =>
    props.active
      ? css`
          color: #7159c1;
          font-weight: bold;
        `
      : css`
          color: #333;
        `}
`;

export const IssueList = styled.ul`
  padding-top: 30px;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const Pagination = styled.div`
  display: flex;

  button {
    margin-top: 30px;
    border: 1px solid #eee;
    background: #fff;
    color: #444;
    border-radius: 4px;
    padding: 5px 8px;
    display: inline-flex;
    line-height: 1;
    align-items: center;
    font-size: 16px;

    &.anterior {
      margin-right: auto;
    }
    &.proximo {
      margin-left: auto;
    }

    &:hover {
      color: #7159c1;
    }
  }
`;

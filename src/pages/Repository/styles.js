import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  svg {
    animation: ${rotate} 1s linear infinite;
    width: 40px;
    height: 40px;
  }
`;

export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  a {
    color: #888;
    font-size: 16px;
    text-decoration: none;
    position: absolute;
    top: 0;
    left: 0;
    display: inline-flex;
    align-items: center;
    transition: transform 0.3s;

    &:hover {
      color: #7159c1;
      transform: translateX(-2px);
    }

    svg {
      width: 16px;
      height: 16px;
      transition: color 0.3s;
    }

    span {
      text-transform: lowercase;
      font-weight: 500;
      font-size: 13px;
      margin-left: 6px;
      transform: translateY(-1px);
      transition: color 0.3s;
    }
  }

  img {
    width: 120px;
    border-radius: 50%;
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

  .stars {
    display: inline-flex;
    margin-top: 10px;
    align-items: center;
    font-size: 11px;
    font-weight: bold;
    color: #666;
    letter-spacing: 0.5px;

    svg {
      color: #7159c1;
      transform: translateY(-1px);
      margin-right: 4px;
    }
  }
`;

export const IssueFilter = styled.div`
  display: flex;
  margin-top: 30px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FilterButton = styled.button`
  flex: 1;
  border: 0;
  padding: 15px 0;
  background: #fff;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
  transition: color 0.3s;

  @media (max-width: 768px) {
    padding: 10px 0;

    & + button {
      padding-top: 0;
    }
  }

  ${props =>
    props.active
      ? css`
          color: #7159c1;
          font-weight: bold;
        `
      : css`
          color: #777;

          &:hover {
            color: #444;
          }
        `}
`;

export const IssueList = styled.div`
  padding-top: 30px;

  .no-issues {
    border: 1px solid #eee;
    border-radius: 3px;
    text-align: center;
    padding: 15px;
    font-size: 13px;
    font-weight: 500;
    color: #7159c1;
  }

  a {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
    transition: box-shadow 0.3s, transform 0.3s;
    text-decoration: none;
    transform: translateZ(0);

    & + a {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
      flex: 0 0 36px;
    }

    div {
      flex: 1;
      margin-left: 12px;

      strong {
        font-size: 16px;
        color: #333;
        transition: color 0.2s;

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.15);

          & + span {
            margin-left: 5px;
          }
        }

        @media (max-width: 768px) {
          font-size: 14px;

          span {
            font-size: 10px;
          }
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }

    &:hover {
      color: #7159c1;
      border-color: #ccc;
      transform: translateY(-2px) translateZ(0);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);

      strong {
        color: #7159c1;
      }
    }

    &:active {
      transform: translate(0);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
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
    font-size: 20px;
    transition: all 0.3s;

    &.anterior {
      margin-right: auto;
    }
    &.proximo {
      margin-left: auto;
    }

    &:hover {
      color: #7159c1;
      border-color: #ccc;
      transform: translateY(-2px);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translate(0);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }
  }
`;

import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
  padding: 40px;
  margin: 80px auto;

  @media (max-width: 768px) {
    margin: 25px auto;
    padding: 25px;
  }

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;

    svg {
      margin-right: 10px;
    }
  }
`;

export default Container;

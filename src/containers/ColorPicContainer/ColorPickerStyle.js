import styled from 'styled-components';

const ColorPickerArea = styled.div`
  float: left;
  width: 50%;

  & h1 {
    font-size: 2rem;
  }

  & li {
    display: inline-block;
    padding-right: 10px;
  }

  @media screen and (max-width: 640px) {
    width: 100%;
    text-align: center;
    margin-bottom: 10%;
  }
`;

ColorPickerArea.ColorBox = styled.div`
  margin-right: 25px;
  float: left;

  & span {
    display: block;
    margin-bottom: 0.5rem;
  }

  & ul {
    padding: 0;
    margin-bottom: 0;
  }

  @media screen and (max-width: 640px) {
    float: unset;
    margin-right: 0;
  }
`;

ColorPickerArea.ColorPickerBox = styled.div`
  @media screen and (max-width: 640px) {
    display: inline-block;
  }
`;

ColorPickerArea.ColorPicRes = styled.button`
  display: block;
  background: ${props => props.color || 'white'};
  border: solid 1px #dcdce1;
  border-radius: 20px;
  width: 25px;
  height: 25px;

  &:focus {
    outline: none;
  }
`;

export default ColorPickerArea;

import styled from 'styled-components';


const HeaderStyle = styled.header`
font-size: 4rem;
  font-weight: 400;
  color: black;
  text-transform: uppercase;
  display:flex;
  align-items: center;
  justify-content: center;

 /* background: radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%);; */
margin-top: 2%;
margin-bottom:4%

`

const TitleStyle = styled.header`
font-weight: 300;
font-size: 2rem;
color: black;
`
const CategoryStyle = styled.header `
font-weight: 300;
font-size: 2rem;
color: black;
`

export { TitleStyle };
export default HeaderStyle;
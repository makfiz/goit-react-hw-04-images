import { Btn } from 'components/Button/Button.styled'
import { Box } from "components/utils/Box";
export const Button = ({ onClickBtn }) => {
    return <Btn type='button' onClick={() => onClickBtn()}>Load more</Btn> 
}
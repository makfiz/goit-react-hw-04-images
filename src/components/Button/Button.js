import { Btn } from 'components/Button/Button.styled'

export const Button = ({ onClickBtn }) => {
    return <Btn type='button' onClick={() => onClickBtn()}>Load more</Btn> 
}
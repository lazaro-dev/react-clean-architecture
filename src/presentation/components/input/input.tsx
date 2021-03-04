import React, { memo } from 'react';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props>= (props: Props) => {
  return (
    <div className={Styles.inputWrap}>
      <input {...props}/>
      <span className={Styles.status}>N</span>
    </div>
  )
}

export default Input;//não renderiza mais vezes pois não tem estado
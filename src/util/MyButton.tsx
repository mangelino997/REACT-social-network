import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

interface Props {
    children: any, 
    onClick?: () => void, 
    tip: string, 
    btnClassName?: string, 
    tipClassName?: string
    
  }

export const MyButton = ({children, onClick, tip, btnClassName, tipClassName}: Props) => {
    return (
        <Tooltip title={tip} className={tipClassName} placement="top">
            <IconButton onClick={onClick} className={btnClassName}>
                {children}
            </IconButton>
        </Tooltip>
    )
}

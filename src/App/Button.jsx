import React, {useEffect, useState} from 'react';
import ButtonElemet from '@material-ui/core/Button';
import './Button.css';


function Button (props) {
    const { onClick } = props;
    const buttonclicked = () => {
        onClick.current();
        setHidden(true);
    };
    const [hidden, setHidden] = useState(false)

    useEffect(() => {
        setHidden(false);
    }, []);

    return (
        <ButtonElemet
            className="points-button"
            color="primary"
            onClick={buttonclicked}
            variant="contained"
            disabled={hidden}>
            Obtener puntos
        </ButtonElemet>
    );
}

export default Button;

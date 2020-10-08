import React, {ButtonHTMLAttributes} from "react";

import {Container} from "./styles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({loading, ...props}) => (
    <Container type="button" {...props}>
        {loading ? "carregando..." : props.children}
    </Container>
);

export default Button;

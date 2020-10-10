import React from "react";

import logoImg from "../../assets/logo.svg";
import {Container, Header, HeaderContent, Profile, Content, Schedule, NextAppointment, Calendar} from "./styles";
import {FiClock, FiPower} from "react-icons/all";
import {useAuth} from "../../hooks/auth";

const Dashboard: React.FC = () => {
    const {user, signOut} = useAuth();
    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="GoBarber"/>
                    <Profile>
                        <img src={user.avatar_url} alt={user.name}/>
                        <div>
                            <span>Bem-vindo,</span>
                            <strong>{user.name}</strong>
                        </div>
                    </Profile>
                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>
            <Content>
                <Schedule>
                    <h1>Horários agendados</h1>
                    <p>
                        <span>Hoje</span>
                        <span>Dia 06</span>
                        <span>Segunda-feira</span>
                    </p>
                    <NextAppointment>
                        <strong>Atendimento a seguir</strong>
                        <div>
                            <img src="https://e7.pngegg.com/pngimages/790/843/png-clipart-avatar-aang-aang-zuko-azula-katara-korra-aang-human-cartoons.png" alt="avatar" />
                            <strong>Avatar</strong>
                            <span>
                                <FiClock />
                                8:00
                            </span>
                        </div>
                    </NextAppointment>
                </Schedule>
                <Calendar>

                </Calendar>
            </Content>
        </Container>
    );
};

export default Dashboard;

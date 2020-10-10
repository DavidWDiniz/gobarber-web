import React, {useCallback, useState} from "react";
import DayPicker, {DayModifiers} from "react-day-picker";
import "react-day-picker/lib/style.css";

import logoImg from "../../assets/logo.svg";
import {Container, Header, HeaderContent, Profile, Content, Schedule, NextAppointment, Section, Appointment, Calendar} from "./styles";
import {FiClock, FiPower} from "react-icons/all";
import {useAuth} from "../../hooks/auth";


const Dashboard: React.FC = () => {
    const [selectedData, setSelectedDate] = useState(new Date());
    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available) {
            setSelectedDate(day);
        }
    }, []);
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
                    <Section>
                        <strong>Manhã</strong>
                        <Appointment>
                            <span>
                                <FiClock />
                                8:00
                            </span>
                            <div>
                                <img src="https://e7.pngegg.com/pngimages/790/843/png-clipart-avatar-aang-aang-zuko-azula-katara-korra-aang-human-cartoons.png" alt="avatar" />
                                <strong>Avatar</strong>
                            </div>
                        </Appointment>

                        <Appointment>
                            <span>
                                <FiClock />
                                8:00
                            </span>
                            <div>
                                <img src="https://e7.pngegg.com/pngimages/790/843/png-clipart-avatar-aang-aang-zuko-azula-katara-korra-aang-human-cartoons.png" alt="avatar" />
                                <strong>Avatar</strong>
                            </div>
                        </Appointment>
                    </Section>
                    <Section>
                        <strong>Tarde</strong>
                        <Appointment>
                            <span>
                                <FiClock />
                                8:00
                            </span>
                            <div>
                                <img src="https://e7.pngegg.com/pngimages/790/843/png-clipart-avatar-aang-aang-zuko-azula-katara-korra-aang-human-cartoons.png" alt="avatar" />
                                <strong>Avatar</strong>
                            </div>
                        </Appointment>
                    </Section>
                </Schedule>
                <Calendar>
                    <DayPicker
                        weekdaysShort={["D", "S", "T", "Q", "Q", "S", "S"]}
                        fromMonth={new Date()}
                        disabledDays={[{daysOfWeek: [0, 6]}]}
                        modifiers={{available: {daysOfWeek: [1, 2, 3, 4, 5]}}}
                        onDayClick={handleDateChange}
                        selectedDays={selectedData}
                        months={[
                            "Janeiro",
                            "Fevereiro",
                            "Março",
                            "Abril",
                            "Maio",
                            "Junho",
                            "Julho",
                            "Agosto",
                            "Setembro",
                            "Outubro",
                            "Novembro",
                            "Dezembro",
                        ]}
                    />
                </Calendar>
            </Content>
        </Container>
    );
};

export default Dashboard;

import React, {useCallback, useEffect, useMemo, useState} from "react";
import DayPicker, {DayModifiers} from "react-day-picker";
import "react-day-picker/lib/style.css";

import logoImg from "../../assets/logo.svg";
import {
    Appointment,
    Calendar,
    Container,
    Content,
    Header,
    HeaderContent,
    NextAppointment,
    Profile,
    Schedule,
    Section
} from "./styles";
import {FiClock, FiPower} from "react-icons/all";
import {useAuth} from "../../hooks/auth";
import api from "../../services/api";

interface MonthAvailabilityItem {
    day: number;
    available: boolean;
}

const Dashboard: React.FC = () => {
    const [selectedData, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);

    const {user, signOut} = useAuth();

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available) {
            setSelectedDate(day);
        }
    }, []);

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);

    useEffect(() => {
        api.get(`/providers/${user.id}/month-availability`, {
            params: {
                year: currentMonth.getFullYear(),
                month: currentMonth.getMonth() + 1,
            }
        }).then(response => {
            setMonthAvailability(response.data);
        });
    }, [user.id, currentMonth]);

    const disabledDays = useMemo(() => {
        return monthAvailability
            .filter(monthDay => !monthDay.available)
            .map(monthDay => {
                const year = currentMonth.getFullYear();
                const month = currentMonth.getMonth();

                return new Date(year, month, monthDay.day);
            });
    }, [currentMonth, monthAvailability]);

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
                        disabledDays={[{daysOfWeek: [0, 6]}, ...disabledDays]}
                        modifiers={{available: {daysOfWeek: [1, 2, 3, 4, 5]}}}
                        onDayClick={handleDateChange}
                        selectedDays={selectedData}
                        onMonthChange={handleMonthChange}
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

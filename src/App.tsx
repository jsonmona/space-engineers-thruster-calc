import React, {useState} from 'react';
import styled from '@emotion/styled';
import InputFields from "./components/InputFields";

const AppBox = styled('div')`
  margin: 1rem;
`;

const FIELD_INFO = [
    {
        display_name: '쉽의 총 중량 (배터리, 추진기 미포함)',
        name: 'ship_total_kg',
        unit: 'kg',
    },
    {
        display_name: '중력',
        name: 'gravity',
        unit: 'G',
    },
    {
        display_name: '배터리 갯수',
        name: 'battery_count',
        unit: '개',
    },
    {
        display_name: 'Small Atmospheric Thruster',
        name: 'small_atmospheric_thruster',
        unit: '개',
    },
    {
        display_name: 'Large Atmospheric Thruster',
        name: 'large_atmospheric_thruster',
        unit: '개',
    },
];

interface DataMap {
    ship_total_kg?: string;
    gravity?: string;
    battery_count?: string;
    small_atmospheric_thruster?: string;
    large_atmospheric_thruster?: string;
}

function App() {
    const [output, setOutput] = useState({
        battery_instant_output: 0,
        battery_total_capacity: 0,
        thruster_max_thrust: 0,
        hovering_thrust: 0,
        hovering_hours: 0,
    });

    const handleChange = (data: DataMap) => {
        const ship_total_kg = Number.parseFloat(data.ship_total_kg || '0');
        const gravity = Number.parseFloat(data.gravity || '0');
        const battery_count = Number.parseFloat(data.battery_count || '0');
        const small_atmospheric_thruster = Number.parseFloat(data.small_atmospheric_thruster || '0');
        const large_atmospheric_thruster = Number.parseFloat(data.large_atmospheric_thruster || '0');

        const effective_mass = ship_total_kg + battery_count * 1040 + small_atmospheric_thruster * 539 + large_atmospheric_thruster * 4244;
        const battery_instant_output = battery_count * 4320;
        const battery_total_capacity = battery_count * 1080;
        const hovering_thrust = effective_mass * gravity * 9.8 / 1000;
        const thruster_max_thrust = large_atmospheric_thruster * 340 + small_atmospheric_thruster * 65;
        const hovering_hours = thruster_max_thrust < hovering_thrust ? 0 : battery_total_capacity / (hovering_thrust / 92.85 * 1000);

        setOutput({
            battery_instant_output,
            battery_total_capacity,
            thruster_max_thrust,
            hovering_thrust,
            hovering_hours,
        })
    };

    return (
        <AppBox>
            <InputFields fields={FIELD_INFO} onChange={handleChange} />
            <div>배터리 순간 출력: {output.battery_instant_output.toLocaleString()} kW</div>
            <div>배터리 총 용량: {output.battery_total_capacity.toLocaleString()} kWh</div>
            <div>추진기 최대 추력: {output.thruster_max_thrust.toLocaleString()} kN</div>
            <div>호버링 추력: {output.hovering_thrust.toLocaleString()} kN</div>
            <div>호버링 지속시간: {output.hovering_hours.toLocaleString()} 시간</div>
        </AppBox>
    );
}

export default App;

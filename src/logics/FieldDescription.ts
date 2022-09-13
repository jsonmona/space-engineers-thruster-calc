import {SIPrefix} from "./UnitValue";

export interface FieldDescription {
    name: string;
    unit: string | null;
    preferred_prefix?: SIPrefix;
    display_name: string;
    readonly: boolean;
}

interface DescriptionMap {
    [Key: string]: FieldDescription
}

export const field_names: Array<string> = [
    'ship_base_mass',
    'gravity',
    'battery_count',
    'small_atmospheric_thruster_count',
    'large_atmospheric_thruster_count',
    'ship_total_mass',
    'battery_instant_output',
    'battery_total_capacity',
    'thruster_max_output',
    'hovering_thrust',
    'hovering_battery_life_hours',
]

export const field_descriptions: DescriptionMap = {
    ship_base_mass: {
        name: 'ship_base_mass',
        unit: 'g',
        preferred_prefix: 'k',
        display_name: '쉽의 기본 중량 (배터리, 추진기 제외)',
        readonly: false,
    },
    gravity: {
        name: 'gravity',
        unit: 'G',
        preferred_prefix: '',
        display_name: '중력',
        readonly: false,
    },
    battery_count: {
        name: 'battery_count',
        unit: null,
        display_name: '배터리 갯수',
        readonly: false,
    },
    small_atmospheric_thruster_count: {
        name: 'small_atmospheric_thruster_count',
        unit: null,
        display_name: '소형 대기권 추진기 갯수',
        readonly: false,
    },
    large_atmospheric_thruster_count: {
        name: 'large_atmospheric_thruster_count',
        unit: null,
        display_name: '대형 대기권 추진기 갯수',
        readonly: false,
    },
    ship_total_mass: {
        name: 'ship_total_mass',
        unit: 'g',
        preferred_prefix: 'k',
        display_name: '쉽의 총 중량 (배터리, 추진기 포함)',
        readonly: true,
    },
    battery_instant_output: {
        name: 'battery_instant_output',
        unit: 'W',
        preferred_prefix: 'k',
        display_name: '배터리 순간 출력',
        readonly: true,
    },
    battery_total_capacity: {
        name: 'battery_total_capacity',
        unit: 'Wh',
        preferred_prefix: 'k',
        display_name: '배터리 총 전력량',
        readonly: true,
    },
    thruster_max_output: {
        name: 'thruster_max_output',
        unit: 'N',
        preferred_prefix: 'k',
        display_name: '추진기 최대 출력',
        readonly: true,
    },
    hovering_thrust: {
        name: 'hovering_thrust',
        unit: 'N',
        preferred_prefix: 'k',
        display_name: '호버링시 요구되는 힘',
        readonly: true,
    },
    hovering_battery_life_hours: {
        name: 'hovering_battery_life_hours',
        unit: null,
        display_name: '호버링 시간',
        readonly: true,
    },
}

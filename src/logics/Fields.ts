import UnitValue from './UnitValue';
import {field_names} from "./FieldDescription";

class Fields {
    ship_base_mass: UnitValue = new UnitValue(0, 'g');
    gravity: UnitValue = new UnitValue(1, 'G');
    battery_count: number = 0;
    small_atmospheric_thruster_count: number = 0;
    large_atmospheric_thruster_count: number = 0;

    ship_total_mass: UnitValue = new UnitValue(0, 'g');
    battery_instant_output: UnitValue = new UnitValue(0, 'W');
    battery_total_capacity: UnitValue = new UnitValue(0, 'Wh');
    thruster_max_output: UnitValue = new UnitValue(0, 'N');
    hovering_thrust: UnitValue = new UnitValue(0, 'N');
    hovering_battery_life_hours: number = 0;

    [Key: string]: any;

    private mut_update() {
        this.ship_total_mass = new UnitValue(
            this.ship_base_mass.getValue() / 1000 +
            this.battery_count * 1040 +
            this.small_atmospheric_thruster_count * 539 +
            this.large_atmospheric_thruster_count * 4244,
            'k', 'g');
        this.battery_instant_output = new UnitValue(this.battery_count * 4320, 'k', 'W');
        this.battery_total_capacity = new UnitValue(this.battery_count * 1080, 'k', 'Wh');
        this.hovering_thrust = new UnitValue(this.ship_total_mass.getValue() * this.gravity.getValue() * 9.8 / 1000, 'N');
        this.thruster_max_output = new UnitValue(this.large_atmospheric_thruster_count * 340 + this.small_atmospheric_thruster_count * 65, 'k', 'N');

        if (this.thruster_max_output < this.hovering_thrust) {
            this.hovering_battery_life_hours = 0;
        } else {
            this.hovering_battery_life_hours = this.battery_total_capacity.getValue() / 1000 / (this.hovering_thrust.getValue() / 92.85);
        }
    }

    update(modifier: (fields: Fields) => void): Fields {
        const copied = new Fields();
        field_names.forEach(k => copied[k] = this[k]);
        modifier(copied);
        copied.mut_update();
        return copied;
    }
}

export default Fields;

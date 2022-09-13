export type SIPrefix = '' | 'k' | 'M' | 'G' | 'T' | 'P' | 'E';
export const SIPrefixOrder: Array<SIPrefix> = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

function parsePrefix(prefix: SIPrefix): number {
    switch (prefix) {
        case '':
            return 1;
        case 'k':
            return 1_000;
        case 'M':
            return 1_000_000;
        case 'G':
            return 1_000_000_000;
        case 'T':
            return 1_000_000_000_000;
        case 'P':
            return 1_000_000_000_000_000;
        case 'E':
            return 1_000_000_000_000_000_000;
    }
}

class UnitValue {
    public readonly value: number;
    public readonly unit: string;

    constructor(value: number, unit: string);
    constructor(value: number, prefix: SIPrefix, unit: string);
    constructor(value: number, prefixOrUnit: SIPrefix | string, maybeUnit?: string) {
        let prefix: SIPrefix;
        let unit: string;

        if (typeof maybeUnit === 'string') {
            prefix = prefixOrUnit as SIPrefix;
            unit = maybeUnit;
        } else {
            prefix = '';
            unit = prefixOrUnit;
        }

        this.value = parsePrefix(prefix) * value;
        this.unit = unit;
    }

    private intoPrefixed(): [SIPrefix, number] {
        let prefix = 0;
        let value = this.value;

        while (value >= 1000 && prefix < SIPrefixOrder.length - 1) {
            prefix++;
            value /= 1000;
        }

        return [SIPrefixOrder[prefix], value];
    }

    getValue(): number {
        return this.value;
    }

    getUnit(): string {
        return this.unit;
    }

    getValueWithPrefix(prefix: SIPrefix): number {
        return this.getValue() / parsePrefix(prefix);
    }

    toLocaleString(): string {
        const [prefix, value] = this.intoPrefixed();
        return `${value.toLocaleString()} ${prefix}${this.unit}`;
    }

    add(other: UnitValue): UnitValue {
        if (this.unit !== other.unit)
            throw new Error(`Tried to add different unit: "${this.unit}" and "${other.unit}"`);

        return new UnitValue(this.value + other.value, this.unit);
    }
}

export default UnitValue;

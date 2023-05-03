import { Style, Unit } from "ts/interfaces/configuration";

export default function FontSize(initialValue: string | number, initialUnit?: Unit): Style {
    return {
        name: 'fontSize',
        value: 'number',
        type: 'style',
        units: ['px'],
        initialValue,
        ...(initialUnit && { initialUnit })
    }
}
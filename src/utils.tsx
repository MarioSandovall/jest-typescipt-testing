import {useEffect, useState} from 'react'
import {getConversionMap} from './getConvertionMap';

export interface CartItem {
    name: string;
    cost: number;
}

export function useItems(
    rootCurrency = Currency.USD,
    targetCurrency = Currency.GBP
) {
    const [items, setItems]: [CartItem[], any] = useState([])
    const defaultItems = [
        {
            name: "Breaking Bach",
            cost: 14.99
        },
        {
            name: "Guardians of the Gaughin",
            cost: 12.95
        },
        {
            name: "Barbthoven",
            cost: 9.99
        }
    ]
    useEffect(() => {
        (async function () {
            for (const item of defaultItems) {
                item.cost = await convertCurrency(item.cost, rootCurrency, targetCurrency)
                item.cost = parseFloat(item.cost.toFixed(2))
            }
            setItems(defaultItems)
        })()
    }, [])
    return items
}

export function getItemsTotal(items: CartItem[]): number {
    const prices = items.map(i => i.cost)
    let total = 0
    for (const price of prices) {
        total += price
    }
    const value = parseFloat(total.toFixed(2));

    if (value < 0) {
        throw new Error("Negative value not allowed")
    }
    return value;
}


export enum Currency {
    USD = "USD",
    CAD = "CAD",
    GBP = "GBP"
}

export async function convertCurrency(
    value: number = 0,
    rootCurrency: Currency,
    targetCurrency: Currency
): Promise<number> {

    const map = await getConversionMap()
    const key = `${rootCurrency}:${targetCurrency}`
    console.table({key})
    const conversion = map[key]
    console.table(map)
    if (!conversion) {
        throw new Error("This currency conversion is not supported")
    }
    const next = value * conversion
    console.table({
        value, rootCurrency, targetCurrency, conversion, next
    })
    return next
}
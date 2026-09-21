jest.mock("./getConvertionMap");

import {convertCurrency, getItemsTotal, Currency} from "./utils";
import {render} from "@testing-library/react"
import {CartItemsDisplay} from "./components/CartItemsDisplay"
// import {cardItems} from "./etc/get-items-total";


describe("The Application", () => {
    describe("Get items total", () => {
        const spectItems = [
            {name: "Item 1", cost: 100},
            {name: "Item 2", cost: 200},
            {name: "Item 3", cost: 300},
        ];

        it("Should correctly calculate the items", () => {
            expect(getItemsTotal(spectItems)).toBe(600);
        })

        it("Should throw an error on a negative const", () => {
            const brokenSpectArray = [{name: 'Broken', cost: -100}];
            expect(() => getItemsTotal(brokenSpectArray)).toThrow();
        })

        const generatedSpect = [];
        const generatedSpectCount = 10;
        const minValid = 0;
        const maxValid = 10000;

        for (let i = 0; i < generatedSpectCount; i++) {
            generatedSpect.push({
                name: `Item ${i}`,
                cost: Math.random() * maxValid - minValid
            });
        }

        it("Should work with generated values", () => {
            const expected = generatedSpect.reduce((a, i) => a + i.cost, 0);
            console.log(expected);
            expect(getItemsTotal(generatedSpect)).toBeCloseTo(expected);
        })
    })

    describe("The currency convertor", () => {
        it("Should convert USD to CAD", async () => {
            const value = 1;
            const root = Currency.USD;
            const target = Currency.CAD;
            const nextValue = await convertCurrency(value, root, target);

            expect(nextValue).toBeCloseTo(1.5);
        })
    })

    describe("The cart item display", () => {
        it("Should math the snapshot", () => {
            const specItem = [
                {name: 'A', cost: 100},
                {name: 'B', cost: 100},
            ];

            const {container} = render(<CartItemsDisplay shoppingCartItems={specItem}/>)
            expect(container).toMatchSnapshot();
        })
    })
})
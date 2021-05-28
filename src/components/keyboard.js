import { h } from "../utils/create-element";
function getLayoutTable(layoutJson) {
    return layoutJson.map(l => l.map(symbolKey => {
        if (typeof symbolKey === 'object') {
            return { symbol: symbolKey.symbol };
        }
        return Object.assign({}, symbolKey);
    }));
}
function addKeyboardKeyListener(button, config, action) {
    // let pressedOn: number = 0;
    button.addEventListener('mousedown', (event) => {
        // TODO
        console.log(event);
    });
    button.addEventListener('mouseup', (event) => {
        // TODO
        console.log(event);
    });
    console.log(config, action);
}
export default (state, config, action) => {
    // Gets the default layout for first
    state.layout = state.layout || (getLayoutTable(config.layouts.layouts.find(l => l.name === config.layouts.defaultLayout).rows));
    // Kb rows format
    const rows = state.layout.map(l => {
        // Row buttons format
        const buttons = l.map(kButton => {
            var _a;
            // Button with icon
            if (kButton.base64Icon) {
                return h('button', 'vs-virtual-kb-row-button-with-icon', [
                    h('img', 'vs-virtual-kb-row-button-with-icon-icon', [], {
                        src: kButton.base64Icon,
                        alt: kButton.symbol
                    })
                ]);
            }
            // Common char button
            if (!state.mode) {
                return h('button', 'vs-virtual-kb-row-button', [], kButton.symbol);
            }
            // Button without variations
            if (!((_a = kButton.variations) === null || _a === void 0 ? void 0 : _a.length)) {
                return h('button', 'vs-virtual-kb-row-button', [], kButton.symbol);
            }
            // Button variation
            const variation = kButton.variations.find(v => v.mode === state.mode);
            if (!variation) {
                return h('button', 'vs-virtual-kb-row-button', [], kButton.symbol);
            }
            // Variation button icon
            if (variation.key.base64Icon) {
                return h('button', 'vs-virtual-kb-row-button-with-icon', [
                    h('img', 'vs-virtual-kb-row-button-with-icon-icon', [], {
                        src: kButton.base64Icon,
                        alt: kButton.symbol
                    })
                ]);
            }
            // Variation symbol
            return h('button', 'vs-virtual-kb-row-button', [], variation.key.symbol);
        });
        // Button listeners
        for (const button of buttons) {
            addKeyboardKeyListener(button, config, action);
        }
        // Row buttons div
        return h('div', 'vs-virtual-kb-row', buttons);
    });
    return h('div', `vs-virtual-kb ${config.wrpClass || ''}`, rows);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5Ym9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJrZXlib2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsQ0FBQyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFHNUMsU0FBUyxjQUFjLENBQUMsVUFBcUM7SUFDM0QsT0FBTyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUMzQyxJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsRUFBRTtZQUNqQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNyQztRQUNELHlCQUFhLFNBQWlCLEVBQUc7SUFDbkMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNMLENBQUM7QUFFRCxTQUFTLHNCQUFzQixDQUFDLE1BQVcsRUFBRSxNQUFzQixFQUFFLE1BQWdCO0lBQ25GLDZCQUE2QjtJQUU3QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDbEQsT0FBTztRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUU7UUFDaEQsT0FBTztRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBR0QsZUFBZSxDQUFDLEtBQW9CLEVBQUUsTUFBc0IsRUFBRSxNQUFnQixFQUFFLEVBQUU7SUFFaEYsb0NBQW9DO0lBQ3BDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxD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
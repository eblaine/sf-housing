class SliderBox {
    constructor(renderer, boxId,  sliderId, dataPoints, smileFilePrefix='SVG/square_thin_', frownFilePrefix='SVG/square_', housingPriceFn, initialHousingPrice, mfi) {
        let slider = document.getElementById(sliderId);
        this.housingPrice = initialHousingPrice;
        // TODO (Mayank): edit based on pseudocode values
        this.incomes = {
            'low': 29120,
            'lowMiddle': mfi * 0.5,
            'highMiddle': mfi * 0.8,
            'high': mfi * 1.25
        }

        this.housingPriceFn = housingPriceFn;
        this.data = JSON.parse(JSON.stringify(dataPoints));

        slider.oninput = function() {
            let sliderVal = slider.value;
            let housingPricePercentageChange = this.housingPriceFn(sliderVal);
            this._updateData(housingPricePercentageChange);
            renderer.render(boxId, this.data, smileFilePrefix, frownFilePrefix);
        }.bind(this);

        this.rents = {};
        this.resetRents(this.data);
    }

    resetRents(origData) {
        Object.keys(origData).map(function(bracket) {
            this.__resetRent(origData, bracket);
        }.bind(this));
        this.data = origData;
    }

    __resetRent(origData, bracket) {
        let numToUpdate = 1000;
        let likelihoodOverburdened = origData[bracket]['overburdened'];
        likelihoodOverburdened = Math.min(90, Math.max(10, likelihoodOverburdened)) / 100;
        let min = this.incomes[bracket] * 0.2;
        let comfortableThreshold = this.incomes[bracket] * 0.3;

        this.rents[bracket] = []
        let max = this.incomes[bracket] * 0.5;

        let maxRentPos = 1.2 * this.housingPrice;

        for (let i = 0; i < numToUpdate; i++) {
            let wasOverburdened = Math.random() < likelihoodOverburdened;
            let range = 0;
            let rent = 0;
            if (wasOverburdened) {
                range = max - comfortableThreshold; // in between comfortable and max
                rent = Math.random() * range + comfortableThreshold;
            } else {
                rent = comfortableThreshold * Math.random();      
            }
            this.rents[bracket].push(rent);  
        }
    }

    _updateData(housingPricePercentageChange) {

        this.housingPrice += this.housingPrice * housingPricePercentageChange / 100;
        let keysCopy = Object.keys(this.data);
        keysCopy.map(function(bracket) {
            this.__updateSingleBracket(bracket, housingPricePercentageChange);
        }.bind(this));
        
    }

    __updateSingleBracket(bracket, housingPricePercentageChange) {
        let min = this.incomes[bracket] * 0.2;
        let comfortableThreshold = this.incomes[bracket] * 0.3;
        
        let newOverburdened = 0;
        this.rents[bracket].forEach((rent) => {
            let newRent = rent + (rent * housingPricePercentageChange / 100);
            newOverburdened += newRent > comfortableThreshold;
        });
        
        this.data[bracket]['overburdened'] = Math.round(100 * newOverburdened / this.rents[bracket].length);
    }

}
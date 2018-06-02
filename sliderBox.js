class SliderBox {
    constructor(renderer, boxId,  sliderId, dataPoints, smileFilePrefix='SVG/square_thin_', frownFilePrefix='SVG/square_', housingPriceFn, initialHousingPrice) {
        let slider = document.getElementById(sliderId);
        this.housingPrice = initialHousingPrice;

        slider.oninput = () => {
            let sliderVal = slider.value;
            let housingPricePercentageChange = this._getPercentageChange(housingPriceFn, sliderVal);
            dataPoints = this._updateData(dataPoints, housingPricePercentageChange);
            renderer.render(boxId, dataPoints, smileFilePrefix, frownFilePrefix);
        }
    }

    _getPercentageChange(housingPriceFn, sliderVal) {
        let newPrice = housingPriceFn(sliderVal);
        let percentChange = (newPrice - this.housingPrice) / this.housingPrice;
        this.housingPrice = newPrice;
        return percentChange;
    }

    _updateData(dataPoints, housingPricePercentageChange) {
        dataPoints = JSON.parse(JSON.stringify(dataPoints)); // copy
        // TODO: update data based on percentage change
        // for now, a silly example:
        if (housingPricePercentageChange < 0) {
            dataPoints['low']['overburdened'] = Math.max(0, dataPoints['low']['overburdened'] - 5);
        } else if (housingPricePercentageChange > 0) {
            dataPoints['low']['overburdened'] = Math.min(100, dataPoints['low']['overburdened'] + 5);
        }

        return dataPoints;
    }

}
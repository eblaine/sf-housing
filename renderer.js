
// See index.html for usage.
class Renderer {
    constructor() {
        this.housing_endpoint = 'https://eblaine.lib.id/sf-housing@dev/';
    }

    render(divId, data) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.housing_endpoint);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onerror = (err) => {}

        xhr.onload = (html) => {
            let divToFill = document.getElementById(divId);
            divToFill.innerHTML = html.target.response;
        }

        data = {
            'dataPoints': data
        };

        data = JSON.stringify(data);
        xhr.send(data);
    }

}





const collectDataFromApi = {
    apiCountryCodes : '',
    API_KEY: '9f875aed93505aff8cc8a8f8',
    async apiData(){
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${this.API_KEY}/latest/BDT/`);
        const {conversion_rates} = await res.json();
        return this.apiCountryCodes = Object.keys(conversion_rates);
    },
}


export default collectDataFromApi
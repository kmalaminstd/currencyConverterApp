

const fetchingApi = {
    localCurr : '',
    convertedCurr : '',
    amount : '',
    
    API_KEY: '9f875aed93505aff8cc8a8f8',

    async fetchApi(){
        console.log(this.localCurr, this.convertedCurr, this.amount);
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${this.API_KEY}/pair/${this.localCurr}/${this.convertedCurr}/${this.amount}`);
        const {conversion_rate, conversion_result} = await res.json();

     return {conversion_rate, conversion_result};
    } 
}


export default fetchingApi
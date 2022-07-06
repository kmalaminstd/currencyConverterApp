const collectDataFromApi = {
    apiCountryCodes : '',
    API_KEY: '9f875aed93505aff8cc8a8f8',
    async apiData(){
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${this.API_KEY}/latest/BDT/`);
        const {conversion_rates} = await res.json();
        return apiCountryCodes = Object.keys(conversion_rates);
        // console.log(countryCodes);
        // countryCodes.map( countryCode => {
            
        //      apiCountryCodes = countryCode
        //     // console.log(apiCountryCodes);
        // });
        // console.log(apiCountryCodes);
    },
}
// collectDataFromApi.apiData();

const fetchingApi = {
    localCurr : '',
    convertedCurr : '',
    amount : '',
    
    API_KEY: '9f875aed93505aff8cc8a8f8',
    // conversion_rate
    // conversion_result
    async fetchApi(){
        console.log(this.localCurr, this.convertedCurr, this.amount);
        const res = await fetch(`https://v6.exchangerate-api.com/v6/${this.API_KEY}/pair/${this.localCurr}/${this.convertedCurr}/${this.amount}`);
        const {conversion_rate, conversion_result} = await res.json();
    //    console.log(conversion_rate);
     return {conversion_rate, conversion_result};
    } 
}

// apiData.fetchApi();

const uiInit = { 
    loadSelectors(){
        const button = document.querySelector('button');
        const form = document.querySelector('form');
        const firstInputCurrElem = document.querySelector('#firstCurrency');
        const firstCurrConvertOption = document.querySelector('#firstCurrConvert');
        const secondInputCurrElem = document.querySelector('#secondCurrency');
        const secCurrConvertOption = document.querySelector('#secCurrConvert');
        const selectElm = document.querySelector('.firstCurrency select');
        const currRate = document.querySelector('#currRate');

        const firstCurrOption = firstCurrConvertOption.options[firstCurrConvertOption.selectedIndex];

        const secondCurrOption = secCurrConvertOption.options[secCurrConvertOption.selectedIndex]

        return{
            button,
            form,
            firstInputCurrElem,
            firstCurrConvertOption,
            secondInputCurrElem,
            secCurrConvertOption,
            selectElm,
            firstCurrOption,
            secondCurrOption,
            currRate
        }
    },
    handleRemoteData(){
        const data = fetchingApi.fetchApi();
         return data;
    },
    showToUi(rates, result){
        const {secondInputCurrElem, currRate} = this.loadSelectors();
        secondInputCurrElem.value = result;
        currRate.textContent = `Rates = ${rates}`;
        console.log(rates, result);
        secondInputCurrElem.style.display = "inline-block";
    },
    gettingValue(){
        const {firstCurrConvertOption, firstInputCurrElem, secCurrConvertOption, } = this.loadSelectors();
        
        const localCountryCode = firstCurrConvertOption.value;
        
        const foreignCountryCode = secCurrConvertOption.value;
        const amount = firstInputCurrElem.value;
        
        return { localCountryCode, foreignCountryCode, amount }
    },

    formSubmit(){
        const {form} = this.loadSelectors();
        form.addEventListener('submit', async e => {
            e.preventDefault();
            const {localCountryCode, foreignCountryCode, amount} = this.gettingValue();

            fetchingApi.localCurr = localCountryCode;
            fetchingApi.convertedCurr = foreignCountryCode;
            fetchingApi.amount = amount;
            // showToUi
            fetchingApi.fetchApi();

            // const {conversion_rate, conversion_result} = fetchingApi.fetchApi();
            const {conversion_rate, conversion_result} = await fetchingApi.fetchApi();
            this.showToUi(conversion_rate, conversion_result)
        })


        window.addEventListener('DOMContentLoaded', async ()=> {
            // console.log(await this.handleRemoteData());

            
            
            // secondInputCurrElem.value = conversion_result;
            // console.log(await fetchingApi.fetchApi());
            // currRate.value = conversion_rate;
            // this.gettingValue()
            const {selectElm, secCurrConvertOption} = this.loadSelectors();
            
            // const data = await collectDataFromApi.apiData();
            collectDataFromApi.apiData();
            const apiCountryCodes = await collectDataFromApi.apiData();
            // const data = collectDataFromApi.apiCountryCodes;
            // console.log(data);
            // console.log(apiCountryCodes);
            apiCountryCodes.map( code => 
                {
                    let countryCodeElements = `<option value="${code}">${code}</option>`;
                    selectElm.insertAdjacentHTML('afterbegin', countryCodeElements);

                    secCurrConvertOption.insertAdjacentHTML('afterbegin',countryCodeElements)
                })
           
            
            // const data = await collectDataFromApi.apiCountryCodes;
           
            // selectElm.insertAdjacentHTML('afterend', countryCodeElements);
            // console.log(data);
        })
    },
    
}

uiInit.formSubmit();
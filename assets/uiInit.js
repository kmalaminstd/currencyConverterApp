

import collectDataFromApi from "./collectDatafromapi.js";
import fetchingApi from "./fetchApi.js";


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
        currRate.textContent = `Rates ${rates}`;
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
       
            fetchingApi.fetchApi();

            const {conversion_rate, conversion_result} = await fetchingApi.fetchApi();
            this.showToUi(conversion_rate, conversion_result)
        })


        window.addEventListener('DOMContentLoaded', async ()=> {

            const {selectElm, secCurrConvertOption} = this.loadSelectors();

            collectDataFromApi.apiData();
            const apiCountryCodes = await collectDataFromApi.apiData();

            apiCountryCodes.map( code => 
                {
                    let countryCodeElements = `<option value="${code}">${code}</option>`;
                    selectElm.insertAdjacentHTML('afterbegin', countryCodeElements);

                    secCurrConvertOption.insertAdjacentHTML('afterbegin',countryCodeElements)
                })
           
        })
    },
    
}


export default uiInit
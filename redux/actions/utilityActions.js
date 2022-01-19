import * as types from "../types";


export const getCountries = (countries)=>{
    return{
        type:types.GET_COUNTRIES.SUCCESS,
        payload:countries
    }
}
export const getBanks = (banks)=>{
    return{
        type:types.GET_BANKS,
        payload:banks
    }
}
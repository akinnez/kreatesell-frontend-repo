import * as types from "../types";


const initialState = {
    loading: false,
    error: {},
    response: {}
}

const PlanUpgradeReducer = (state=initialState, {type, payload})=>{
    switch(type){
        case types.MAKE_PLAN_UPGRADE.REQUEST:
            return {...state, loading: true};

        case types.MAKE_PLAN_UPGRADE.SUCCESS:
            return {...state, loading: false, response: payload};

        case types.MAKE_PLAN_UPGRADE.FAILURE:
            return {...state, loading: false, error: payload};

        default:
            return state;
    }
}

export default PlanUpgradeReducer;
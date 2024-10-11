import { AdvisorAction, AdvisorsState } from "@/app/types";

export const advisorReducer = (state:AdvisorsState, action:AdvisorAction ):AdvisorsState => {
  switch (action.type) {
    case 'setAdvisors':
        return {
            ...state,
            isLoading: false,
            hasError: false,
            data: action.payload
        }
    case 'setAdvisorsError':
        return {
            ...state,
            isLoading: false,
            hasError: action.payload,
            data: []
        }
    case 'setAdvisorById':
        return {
            ...state,
            isLoading: false,
            hasError: false,
            advisorById: action.payload
        }
    case 'setAdvisorsErrorById':
        return {
            ...state,
            isLoading: false,
            hasError: action.payload,
            advisorById: []
        }
    case 'createAdvisor':
        return {
            ...state,
            isLoading: false,
            hasError: false,
            data: [...state.data, action.payload]
        }
    case 'createAdvisorError':
        return {
            ...state,
            isLoading: false,
            hasError: action.payload,
            data: []
        }
    case 'deleteAdvisor': 
        return {
            ...state,
            isLoading: false,
            hasError: false,
            data: state.data.filter(advisor => advisor.id !== action.payload) 
        }
    case 'deleteAdvisorError':
        return {
            ...state,
            isLoading: false,
            hasError: action.payload
        }
    case 'updateAdvisor':
        return {
            ...state,
            isLoading: false,
            hasError: false,
            data: state.data.map(advisor => 
                advisor.id === action.payload.id ? action.payload : advisor)
        }
    case 'updateAdvisorError':
        return {
            ...state,
            isLoading: false,
            hasError: action.payload
        }
    default:
        return state;
  }
}
import {UPDATESEARCHNAME,SEARCH,REQ_ING,REQ_SUCCESS,REQ_FAIL} from "./mutation_types"
export default {
  [UPDATESEARCHNAME](state,searchName){
      state.searchName = searchName
  },
  [SEARCH](state,cards){
      state.cards = cards
  },
  [REQ_ING](state){
    state.showMsg = false;
    state.showLoing = true;
    state.showNoBody = false;
  },
  [REQ_SUCCESS](state){
    state.showMsg = false;
    state.showLoing = false;
    state.showNoBody = false;
  },
  [REQ_FAIL](state){
    state.showMsg = false;
    state.showLoing = false;
    state.showNoBody = true;
  }
}

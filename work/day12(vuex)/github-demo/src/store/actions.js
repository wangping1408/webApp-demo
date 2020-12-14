import axios from "../http"
import {UPDATESEARCHNAME,SEARCH,REQ_ING,REQ_SUCCESS,REQ_FAIL} from "./mutation_types"
export default {
  [UPDATESEARCHNAME]({commit},searchName){
    commit(UPDATESEARCHNAME,searchName)
  },
  async [SEARCH]({commit,state}) {
    try {
      //发送请求 正在请求中
      commit(REQ_ING);
      let {items} = await axios.get("https://api.github.com/search/users",{
        params:{
          q:state.searchName
        }
      })
      items = items.map( item=>({
        page:item.html_url,
        avatar:item.avatar_url,
        userName:item.login
      }) )
      commit(SEARCH,items)
      //请求成功的完成
      commit(REQ_SUCCESS);
    }catch (e) {
      //请求失败
      commit(REQ_FAIL);
    }
  }
}

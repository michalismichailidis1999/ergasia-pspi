export const getAxiosConfig = (isSendingData=false, token=null) => {
    if(isSendingData){
        if(token){
            return {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        }else{
            return {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        }
    }else{
        if(token){
            return {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
        }else{
            return {}
        }
    }
}

export const getAxiosBody = (obj) => JSON.stringify(obj);
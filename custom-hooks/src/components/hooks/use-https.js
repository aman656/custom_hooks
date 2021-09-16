import { useState,useCallback } from "react"

const useHttp = ()=>{
    const[error,setError] = useState(null)
    const[loading,setLoading] = useState(false)

    const requesttodb = useCallback(async(request,workonData)=>{
        setLoading(true)
        setError(null)
        try{
            const response  = await fetch(request.url,{
                method:request.method ? request.method:"GET", //if the request is POST we will pass the parameter otherwise it will be always GET request
                headers:request.headers? request.headers:{}, // if the request is POST we will pass the parameter otherwise it is an empty object
                body:request.body ?  JSON.stringify(request.body):null // if the request is POST we will pass the parameter otherwise it is none
            })
            if(!response.ok){
                throw new Error("Something went wrong!")
            }
            const data = await response.json()
            workonData(data)
        }
        catch(err){
            setError(err.message || "An error occured")


        }
        setLoading(false)
    },[])
    return {
        loading,
        error,
        requesttodb,
    }

}
export default useHttp;
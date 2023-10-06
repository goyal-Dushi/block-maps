import { ActionFunction, redirect } from "react-router-dom";

export const mapFormAction: ActionFunction = async ({ request}) => {
    const formData = await request.formData();
    const url = new URL(request.url);

    let redirectURL: string =  url.origin + url.pathname;
    const searchParams = new URLSearchParams(url.search);
    
    for(const [key, value] of formData.entries()){
        if(value){
            searchParams.set(key, value as string);
        }
    }
    
    redirectURL = redirectURL + "?" + searchParams.toString();
    return redirect(redirectURL);
}
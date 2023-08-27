import { ActionFunction, redirect } from "react-router-dom";

export const getMapInfoAction: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    let url = "/map?";

    let flag = 1;
    for (const [key, value] of formData.entries()) {
        if(!value){
            continue;
        }
        if(flag){
            url += `${key}=${value}`;
            flag = 0;
            continue;
        }
        url += `&${key}=${value}`;
    }
    return redirect(url);
}
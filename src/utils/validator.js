export const isEmptyField = (value) => {
    if(value.length > 0){
        return true;
    }else{
        return false
    }
}

export const validateEmail = (email) => {
    return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)
};
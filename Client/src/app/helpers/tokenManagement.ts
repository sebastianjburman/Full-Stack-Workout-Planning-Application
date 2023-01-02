export class TokenManagement{
    public static saveTokenToLocalStorage(token:string):void{
        localStorage.setItem('token', token);
    }
    public static getTokenToLocalStorage():any{
        return localStorage.getItem('token')||null
    }
}
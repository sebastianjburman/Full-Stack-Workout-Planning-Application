export class TokenManagement{
    public static saveTokenToLocalStorage(token:string):void{
        localStorage.setItem('token', token);
    }
    public static getTokenFromLocalStorage():any{
        return localStorage.getItem('token')||null
    }
    public static removeTokenFromLocalStorage():void{
        localStorage.removeItem("token");
    }
    public static clearLocalStorage():void{
       localStorage.clear(); 
    }
}
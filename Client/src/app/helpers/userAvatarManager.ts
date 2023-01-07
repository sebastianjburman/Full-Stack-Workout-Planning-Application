export class UserAvatarManager{
    public static saveAvatarUrlToLocalStorage(avatarUrl:string):void{
        localStorage.setItem('avatarUrl', avatarUrl);
    }
    public static getAvatarUrlFromLocalStorage():any{
        return localStorage.getItem('avatarUrl')||null
    }
    public static removeAvatarUrlFromLocalStorage():void{
        return localStorage.removeItem("avatarUrl");
    }
}
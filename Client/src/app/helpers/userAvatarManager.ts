export class UserProfileManager{
    public static saveAvatarUrlToLocalStorage(avatarUrl:string):void{
        localStorage.setItem('avatarUrl', avatarUrl);
    }
    public static getAvatarUrlFromLocalStorage():any{
        return localStorage.getItem('avatarUrl')||null
    }
    public static removeAvatarUrlFromLocalStorage():void{
        return localStorage.removeItem("avatarUrl");
    }
    public static saveUsernameToLocalStorage(avatarUrl:string):void{
        localStorage.setItem('displayName', avatarUrl);
    }
    public static getUsernameFromLocalStorage():any{
        return localStorage.getItem('displayName')||null
    }
    public static removeUsernameFromLocalStorage():void{
        return localStorage.removeItem("displayName");
    }
}
/*  Ez a komponens a navigációs sáv elemeit tárolja.
    A "useNavigation()" funkciót exportálja, 
    mely visszaadja a navigációs linkeket.
*/

export function useNavigation() {
    /*  A navigációs linkeket egy tömbben[] tároljuk, 
        melynek minden eleme egy objektum{}.

        - 'text': A gomb szövege, melyet a felhasználó lát.
        - 'to': A Vue router útvonala, melyre a gomb navigál.
    */

    const middleLinks = [
        { text: "Főoldal", to: "/" },
        { text: "Lovak", to: "/horses" },
        { text: "Galéria", to: "/galery" },
    ];
    
    const rightLinks = [
        { text: "Dashboard", to: "/dashboard" },
        { text: "Bejelentkezés", to: "/login" }
    ]

    const dashboardLinks = [
        { text: "Üzenetek", to: "/dashboard/messages", icon: "mdi-email"},
        { text: "Lovak", to: "/dashboard/horses", icon: "mdi-horse"},
    { text: "Regisztráció", to: "/dashboard/register", icon: "mdi-account-plus"},
    ]

    /*  A függvény egy objektummal tér vissza, 
        mely a navigációs linkeket tartalmazza.
    */
    return { middleLinks, rightLinks, dashboardLinks };
}
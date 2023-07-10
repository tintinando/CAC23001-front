export function getLoggedInFromLS() {
    const storedData = localStorage.getItem('isLoggedIn');
    if (storedData) {
        const { loggedIn, expirationTime } = JSON.parse(storedData);
        if (expirationTime && new Date().getTime() > expirationTime) {
            // El estado ha expirado
            return false;
        } else {
            // El estado aún es válido
            return loggedIn;
        }
    }
    return false; // Valor predeterminado si no se encuentra en localStorage
}

export function setLoggedInInLS(loggedIn){
    const expirationTime = new Date().getTime() + 10*60*1000; // ts + 10 minutos
    const dataToStore = {
        loggedIn,
        expirationTime,
    };
    localStorage.setItem('isLoggedIn', JSON.stringify(dataToStore));
}
if (navigator && navigator.serviceWorker) {
    try {
        navigator.serviceWorker.register('../sw.js');
    }
    catch(error) {
        console.log(error);
    }
}
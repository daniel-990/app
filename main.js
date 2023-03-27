(function(){

    const texto = "dato";

    //parse
    Parse.initialize("QZC8gDxQTUrzFJAG3CTljdAzeTCjlC9nWvuNtpc2", "vYvHD5qbSbx1tAbv1f29vXnR1UMlEprl5axFmpbn"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = "https://parseapi.back4app.com";
    

    const database = new Parse.Object("danielDb");
    database.set("titulo", "lorem");
    database.set("contenido", "lorem");
    try {
        let result = database.save();
        console.log(result);
    } catch(error) {
        console.log('Failed to create new object, with error code: ' + error.message);
    }


    // try {
    //     const autor = carta.get("autor");
    //     const titulo = carta.get("titulo");
    //     const contenido = carta.get("contenido");
    //     console.log(`autor: ${autor}, titulo: ${titulo}, contenido: ${contenido}`);
    //     setInterval(function(){
    //         location.reload();
    //     },2000);

    // } catch (error) {
    //     console.log(`Failed to retrieve the object, with error code: ${error.message}`);
    // }

    const frases = (frase) => {
        return `<div class="container">
            ${frase}
        </div>`;
    }

    console.log(frases(texto));


})();

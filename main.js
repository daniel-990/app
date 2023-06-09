import datos from './config/config.json' assert {
    type: 'json'
}

(function(){

    const id = datos.data.id;
    const apikey = datos.data.apikey;
    const serverUrl = datos.data.serverUrl;

    const render = document.getElementById("render");
    const crearUserBtn = document.getElementById("crearUser");
    const login = document.getElementById("iniciarSesion");

    //parse
    Parse.initialize(id, apikey); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = serverUrl;

    const database = new Parse.Object("danielDb");

    //inputs
    const titulo = document.getElementById("titulo-portafolio");
    const contenido = document.getElementById("contenido-portafolio");
    const btnEnviar = document.getElementById("enviar");

    const guardarDatos = () => {
        if (titulo.value === "" || contenido.value === ""){
            alert("por favor llene todos los campos");
        }else{
            
            database.set("titulo", titulo.value);
            database.set("contenido", contenido.value);

            try { 
                let result = database.save();
                console.log(result);
                setTimeout(() => {
                    titulo.value = "";
                    contenido.value = "";
                    location.reload();
                },1000);
            } catch(error) {
                console.log('Failed to create new object, with error code: ' + error.message);
            }
        }
    }

    

    const mostarDatos = async () => {
        const cartas = new Parse.Query("danielDb");
        try {
          const resultados = await cartas.find();
          for (const object of resultados) {

            const titulo = object.get('titulo');
            const contenido = object.get('contenido');

            console.log(`nombre: ${titulo} \nmensaje: ${contenido}`);

            let html = `
                <i class="bi bi-person-circle"></i> <b style="color: red;">${titulo}</b> dice: <br> <i class="bi bi-chat-dots"></i> ${contenido} <hr>
            `;

            render.innerHTML += html;

          }
        } catch (error) {
          console.error('Error while fetching Project', error);
        }
    }

    //crear usuarios 
    const crearUser = () => {

        const nombre = prompt('Ingrese su correo');
        const correo = prompt('Confime su correo');
        const pass = prompt('Ingrese su contraseña');

        if(nombre == "" || pass == "" || correo == ""){
            alert("Todos los campos son obligatorios *");
        }else{
            // Create a new instance of the user class
            var user = new Parse.User();
            user.set("username", nombre); //obligatorio
            user.set("password", pass);   //obligatorio
            user.set("email", correo); //obligatorio
        
            user.signUp().then(function(user) {
                console.log('registro exitoso: ' + user.get("username") + ' email: ' + user.get("email"));
                alert("registro exitoso: " + user.get("username"));
            }).catch(function(error){
                console.log("Error: " + error.code + " " + error.message);
                alert("Error: " + error.code + " " + error.message);
            });
        }

    }

    //login
    const loginApp = () => {

        const nombre = prompt('Ingrese su correo');
        const pass = prompt('Ingrese su contraseña');

        const user = Parse.User.logIn(nombre, pass).then(function(user) {
            console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
            mostarDatos();
        }).catch(function(error){
            console.log("Error en el login: " + error.code + " " + error.message);
        });
    }

    //funciones
    btnEnviar.addEventListener('click', guardarDatos);
    crearUserBtn.addEventListener('click',crearUser);
    login.addEventListener('click', loginApp);
    

})();
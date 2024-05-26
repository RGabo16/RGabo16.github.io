document.addEventListener('DOMContentLoaded', function() {
    //variables
    var palabraMain = ""
    var intentos = 6
    var tamañoP = 0
    var jugador1 = prompt("Coloque el nombre del jugador1: ")
    var jugador2 = prompt("Coloque el nombre del jugador2: ")
    var jugador1_P = 0
    var jugador2_P = 0
    var jugador1_W = 0
    var jugador2_W = 0
    var jugador1_L = 0
    var jugador2_L = 0
    var adivinanzas = 0  
    var turno = 0

    document.getElementById("jugador1").innerHTML = "<td>"+jugador1+"</td><td>"+jugador1_P+"</td><td>"+jugador1_W+"</td><td>"+jugador1_L+"</td>"
    document.getElementById("jugador2").innerHTML = "<td>"+jugador2+"</td><td>"+jugador1_P+"</td><td>"+jugador1_W+"</td><td>"+jugador1_L+"</td>"
    function valores(){
        tamañoP =0
        if (palabraMain !=null || palabraMain !=""){
            //toma cada valor de la palabra por separado
            for (x in palabraMain){
                if(palabraMain[x] != " " && isNaN(palabraMain[x])){
                    tamañoP+=1
                    
                }                
            }
        }
    }

    //reinicia todos los valores
    document.getElementById("reinicio").addEventListener("click", function(event) {
        palabraMain = ""
        intentos = 6
        tamañoP = 0
        jugador1 = prompt("Coloque el nombre del jugador1: ")
        jugador2 = prompt("Coloque el nombre del jugador2: ")
        jugador1_P = 0
        jugador2_P = 0
        adivinanzas = 0  
        jugador1_W = 0
        jugador2_W = 0
        jugador1_L = 0
        jugador2_L = 0
        document.getElementById("jugador1").innerHTML = "<td>"+jugador1+"</td><td>"+jugador1_P+"</td><td>"+jugador1_W+"</td><td>"+jugador1_L+"</td>"
        document.getElementById("jugador2").innerHTML = "<td>"+jugador2+"</td><td>"+jugador1_P+"</td><td>"+jugador1_W+"</td><td>"+jugador1_L+"</td>"
        adivinanzas = 0 
        turno =0
        valores()
    
    });
    function cambiar_muneco(intentos){
        if (intentos>0){
            var imagen=document.getElementById("stickman")
            imagen.src="imagenes/Ahorcado"+intentos+".PNG"
        }   
    }
    


    function quejugadorgano(player, puntos, victoria){
        if (player == jugador1){
            jugador1_P+=puntos
            if (victoria == -1){
                jugador1_L +=1
            }else if (victoria == 1){
                jugador1_W +=1
            }
            document.getElementById("jugador1").innerHTML = "<td>"+player+"</td><td>"+jugador1_P+"</td><td>"+jugador1_W+"</td><td>"+jugador1_L+"</td>"
        }else{
            jugador2_P+=puntos
            if (victoria == -1){
                jugador2_L +=1
            }else if (victoria == 1){
                jugador2_W +=1
            }
            document.getElementById("jugador2").innerHTML = "<td>"+player+"</td><td>"+jugador2_P+"</td><td>"+jugador2_W+"</td><td>"+jugador2_L+"</td>"
        }
    }


    //comprueba si la letra pertenece a la palabra
    function comprobar(letra, jugador){ 
        let encontro = 0     
        for (x in palabraMain){
            if (letra.toLowerCase()==palabraMain[x].toLowerCase()){
                const elements = document.getElementById(palabraMain[x].toLowerCase());
                elements.style.color="black"
                elements.id = letra+letra
                encontro += 1    
            }
        }
        //si no se encontro ni una letra en la palabra da un mensaje en rojo
        if (encontro <1){
            let acierto = document.getElementById("aciertos")
            acierto.style.color = "red"
            acierto.innerHTML = "AYYYYYYYYYYYYY"
            intentos -=1
            cambiar_muneco(intentos)
           
        }else{ //sino en verde
            let acierto = document.getElementById("aciertos")
            acierto.style.color = "green"
            acierto.innerText = "BUENAAAAA"
            adivinanzas +=encontro
        }
        //cuenta los intentos faltantes
        if (intentos<=0){
            quejugadorgano(jugador,adivinanzas,-1)
            alert(jugador +" es el perdedor, La palabra era: \n" +palabraMain);
            

        }//cuenta los aciertos faltantes
        else if (adivinanzas>=tamañoP){
            quejugadorgano(jugador,adivinanzas,1)
            alert("GANASTE "+jugador+"\nPalabra: "+palabraMain)
        }//actualiza el contador de intentos
        document.getElementById("intentos").innerText = "intentos restantes: "+intentos;
       

    }
    

    //funcion main, inicia las rondas                
    function juego(jugador){
        intentos = 6
        tamañoP = 0
        adivinanzas = 0  
        
        palabraMain = prompt("Coloque la palabra para que "+jugador+" la adivine:\n")
        cambiar_muneco(intentos)
        valores()
        document.getElementById("intentos").innerText = "intentos restantes: "+intentos;
        document.getElementById("aciertos").innerHTML = ""
        //toma los valores de las letras a y z
        var i = "a".charCodeAt(0), j = "z".charCodeAt(0);
        //elimina las letras ya usadas
        document.getElementById("letras").innerHTML ="";
        //agrega cada letra como boton de la a hasta la z
        for( ; i<=j; i++) {
            let letra = String.fromCharCode(i).toUpperCase()
            var letras = document.createElement("div");
            letras.classList.add("letras");
            letras.innerHTML = "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
            
            var pendingList = document.getElementById("letras");
            //si se pulsa la letra se comprueba si esta en la palabra
            letras.addEventListener("click", function(){
                document.getElementById(letra).disabled = true;
                if (intentos <=0 || adivinanzas>=tamañoP){}
                else{
                    comprobar(letra, jugador)}
            });
            pendingList.appendChild(letras);
            //añade la ñ
            if (i==110) {
                var letras = document.createElement("div");
                letras.classList.add("letras");
                letras.innerHTML= "<button value='Ñ' onclick='intento(\"Ñ\")' class='letra' id='Ñ'>Ñ</button>";

                
                var pendingList = document.getElementById("letras");
                letras.addEventListener("click", function(){
                    document.getElementById("Ñ").disabled = true;
                    if (intentos <=0 || adivinanzas>=tamañoP){}
                    else{
                        comprobar(letra, jugador)}
                });
                pendingList.appendChild(letras);

            }

        }
        //reinicia la palabra
        var palabra = document.getElementById("palabra")
            palabra.innerHTML ="";
        //separa las nuevas letras y las coloca
        for (i in palabraMain) {
            var letre = palabraMain[i];
            var palabra = document.getElementById("palabra")
            //sustituye los espacios por "/"
            if (letre == " "){
                palabra.innerHTML +="<div>/</div>"}
            //agrega los numeros 
            else if (!isNaN(letre)){
                palabra.innerHTML +="<div>"+letre+"</div>"}
            else{
                palabra.innerHTML +="<span id="+ letre.toLowerCase() +">"+ letre.toUpperCase() +"</span>";}
        }
        
        return;
    }

    //cuando se le da a empezar juego este inicia, alternando los turnos
    document.getElementById("jugar").addEventListener("click", function(event){
        if (turno == 0){
            turno=1
            juego(jugador1);
        }else{
            turno=0
            juego(jugador2);
        }
        

    });
    
    
    
    






});
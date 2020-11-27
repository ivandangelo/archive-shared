  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    toolbar: {
        hideOnPageScroll: true,
    },
    // Add default routes
    routes: [
      {
        path: '/me/',
        url: 'me.html',
      },
      {
        path: '/index/',
        url: 'index.html',
      }

    ]
    // ... other parameters
  });


var mainView = app.views.create('.view-main');
var storage = firebase.storage();
var db = firebase.firestore();
var emailActual = '';
//console.log(colUsuarios);
//console.log(colArchivos);


function returnFileSize(number) {
    if(number < 1024) {
        return number + 'bytes';
    } else if(number >= 1024 && number < 1048576) {
        return (number/1024).toFixed(1) + 'KB';
    } else if(number >= 1048576) {
        return (number/1048576).toFixed(1) + 'MB';
    }

}

function createUser(email,pass,apodo){


    docUser = {
            apodo: ''+apodo,
            foto: 'url firebase'

     };

    firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(function(){

        emailActual = email;

        db.collection('usuarios').doc(email).set(docUser)
        .then(function(){
            //colArchivos = colUsuarios.doc(email).collection('archivos');
            //colArchivos = db.collection('usuarios/'+email+'/archivos');
            //console.log(colArchivos);
            mainView.router.navigate('/me/');
            


        })

    })
    .catch(function(error) {
        // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
         console.log(errorCode+' '+errorMessage);
    });

}

function logIn(email,pass){

    firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(function() {
            emailActual = email;
            mainView.router.navigate('/me/');

        })
        .catch(function(error) {
             var errorCode = error.code;
             var errorMessage = error.message;
             console.log(errorCode+' '+errorMessage);


        });

}

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    //console.log(FileTransfer);

});

// Option 1. Using one 'page:init' handler for all pages
/*
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})
*/

// Option 2. Using live 'page:init' event handlers for each page

$$(document).on('page:init', '.page[data-name="me"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log('me.html');
    //console.log(colUsuarios.doc(emailActual).collection('archivos'));


    /*$$('#setImg').on('click', function(){
        console.log('img seteada');

    } );*/
    $$('#in').on('change',function(){


        const obj = $$(this)[0];
        const currentFiles = obj.files;
        //console.log(currentFiles);
        var icon = '';
        var typeFile = '';
        var nameFile = '';
        var sizeFile = '';
        var msj='';
        var elementoAInsertar= '';

        if(currentFiles.length!=0){
            for(let i=0;i<currentFiles.length;i++){
                //console.log(currentFiles[i].name);
                typeFile = currentFiles[i].type;
                nameFile = currentFiles[i].name;
                sizeFile = returnFileSize(currentFiles[i].size);
                msj=nameFile+' '+sizeFile;
                //console.log(msj);

                //agregando documentos a la subcoleccion okk
                colRef = db.collection('usuarios/'+emailActual+'/archivos');
                docFile={
                    url:i

                };
                colRef.doc(nameFile).set(docFile);

                if(typeFile.includes('image')){
                    //console.log('imagen');
                    icon='photo';

                }else if(typeFile.includes('video')){
                    icon='film';

                }else if(typeFile.includes('text')){
                    icon='doc_plaintext';
    

                }else if(typeFile.includes('pdf')){
                    icon='doc_richtext'
    

                }else{
                    //default icon
                    icon='doc'

                }

                elementoAInsertar = '<div class="treeview-item"><div class="treeview-item-root"><div class="treeview-item-content"><label class="checkbox"><input type="checkbox"><i class="icon-checkbox"></i></label><i class="icon f7-icons">'+icon+'</i><div class="treeview-item-label"><p>'+msj+'</p></div></div></div></div>';
                $$('#arbol').append(elementoAInsertar);

                /*
                expected output
                imagen
                video
                txt
                pdf
                */


            }


        }




    } );


})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log('index.html');
    $$('#btnLogin').on('click',function(){
        var email = '';
        var pass = '';
        email = $$('#mail').val();
        pass = $$('#pass').val();

        //console.log(email+' '+pass);

        logIn(email,pass);



    } );

    $$('#btnRegis').on('click',function(){
        var email = $$('#mailRegis').val();
        var pass = $$('#passRegis').val();
        var confPass = $$('#confPassRegis').val();
        var apodo = $$('#apodo').val();

        //console.log(email+' '+pass+' '+confPass+' '+apodo);
        if(apodo!='' && (confPass==pass)){
            createUser(email,pass,apodo);

        }

    });


});
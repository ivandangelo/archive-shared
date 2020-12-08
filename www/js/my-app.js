  
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
var db = firebase.firestore();
var storageRef = firebase.storage().ref();
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

async function logIn(email,pass){

    emailActual = email;
    firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(function() {
            mainView.router.navigate('/me/');
            //colRefDatosUser = db.doc('usuarios/'+emailActual);
            //colRefArchivosUser = db.collection('usuarios/'+emailActual+'/archivos');


        })
        .catch(function(error) {
             var errorCode = error.code;
             var errorMessage = error.message;
             console.log(errorCode+' '+errorMessage);

        });
        //var colRefDatosUser = db.collection('usuarios').doc(emailActual);
        //var colRefArchivosUser = db.collection('usuarios').doc(emailActual).collection('archivos');
        //console.log(colRefDatosUser);
        //console.log(colRefArchivosUser);
        db.collection('usuarios').doc(emailActual).get().then(function(doc) {
            if (doc.exists) {
                //console.log('apodo '+doc.data().apodo);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        await recuperarDatosUsuarioLogeado();



}
function recuperarDatosUsuarioLogeado(){
    /*db.collection('usuarios').get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            console.log('id '+doc.id+' apodo '+doc.data().apodo);
        });
        //console.log(querySnapshot);

    }).catch(function(error){
        console.log("error "+error);

    });*/
    //console.log(emailActual);
    var msj = '';
    var icon = '';
    var name = '';
    var size = '';
    var type = '';
    var url = '';
    var elementoAInsertar = '';
    db.collection('usuarios').doc(emailActual).collection('archivos').get()
    .then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
            name = doc.id;
            size = doc.data().size;
            type = doc.data().type;
            url = doc.data().url;
            msj = name+' '+size;
            //console.log('id '+doc.id+' size '+doc.data().size+' type '+doc.data().type+' url '+doc.data().url);
            if(type.includes('image')){
                //console.log('imagen');
                icon='photo';

            }else if(type.includes('video')){
                icon='film';

            }else if(type.includes('text')){
                icon='doc_plaintext';


            }else if(type.includes('pdf')){
                icon='doc_richtext'


            }else{
                //default icon
                icon='doc'

            }


            elementoAInsertar = '<div class="treeview-item"><div class="treeview-item-root"><div class="treeview-item-content"><label class="checkbox"><input type="checkbox"><i class="icon-checkbox"></i></label><i class="icon f7-icons">'+icon+'</i><div class="treeview-item-label"><p>'+msj+'</p></div></div></div></div>';
            $$('#arbol').append(elementoAInsertar);
        });

        //console.log(querySnapshot);

    }).catch(function(error){
        console.log("error "+error);

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
    //console.log(emailActual);
    colRef = db.collection('usuarios/'+emailActual+'/archivos');
    //console.log(colUsuarios.doc(emailActual).collection('archivos'));


    /*$$('#setImg').on('click', function(){
        console.log('img seteada');

    } );*/

    $$('#dwl').on('click',function(){
        console.log('entrando a descargar');
        $$('input[type=checkbox]:checked').each(function(){
            console.log();


        });


    });//fin download


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
        var verSiExiste
        //console.log(archivosUsuarioRef.fullPath);
        //console.log('email actual'+emailActual);
        //console.log(archivoRef);
        //console.log('bucket '+archivoRef.bucket+' name '+archivoRef.name+' fullpath '+archivoRef.fullPath);

        if(currentFiles.length!=0){
            for(let i=0;i<currentFiles.length;i++){
                //console.log(currentFiles[i].name);

                typeFile = currentFiles[i].type;
                nameFile = currentFiles[i].name;
                sizeFile = returnFileSize(currentFiles[i].size);
                msj=nameFile+' '+sizeFile;

                db.collection('usuarios').doc(emailActual).collection('archivos').doc(nameFile).get()
                    .then(function(doc){
                        if(!doc.exists){
                            console.log(emailActual+' '+nameFile);
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
                            //console.log(msj);

                            //agregando documento a storage
                            var path = emailActual+'/'+nameFile; //i.e ivan@mail.com/cv.docx
                            archivosUsuarioRef = storageRef.child(path);
                            var uploadTask = archivosUsuarioRef.put(currentFiles[i]);
                            // Register three observers:
                            // 1. 'state_changed' observer, called any time the state changes
                            // 2. Error observer, called on failure
                            // 3. Completion observer, called on successful completion
                            uploadTask.on('state_changed',function(snapshot){//1
                                // Observe state change events such as progress, pause, and resume
                                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                var progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                                console.log('upload is '+progress+'% done');
                                switch(snapshot.state){
                                    case firebase.storage.TaskState.PAUSED:
                                        console.log('upload is paused');
                                        break;
                                    case firebase.storage.TaskState.RUNNING:
                                        // console.log('upload is running'); se dispara
                                        break;


                                }
                                    


                            }, function(error){
                                // Handle unsuccessful uploads

                            }, function(){
                                // Handle successful uploads on complete
                                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                                uploadTask.snapshot.ref.getDownloadURL()
                                    .then(function(downloadURL){
                                        console.log('file available at '+downloadURL);
                                        docFile={
                                            url: downloadURL,
                                            type: typeFile,
                                            size: sizeFile,
                                            icon: icon

                                        };
                                        colRef.doc(nameFile).set(docFile);

                                });


                            });
                            elementoAInsertar = '<div class="treeview-item"><div class="treeview-item-root"><div class="treeview-item-content"><label class="checkbox"><input type="checkbox"><i class="icon-checkbox"></i></label><i class="icon f7-icons">'+icon+'</i><div class="treeview-item-label"><p>'+msj+'</p></div></div></div></div>';
                            $$('#arbol').append(elementoAInsertar);



                        }else {
                            console.log('el archivo existe');

                        }
                    })
                    .catch(function(error){

                    });

                
                //expected output
                //imagen
                //video
                //txt
               //pdf
                


            }


        }

    });//fin #in





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



    });

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
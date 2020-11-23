  
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

function returnFileSize(number) {
    if(number < 1024) {
        return number + 'bytes';
    } else if(number >= 1024 && number < 1048576) {
        return (number/1024).toFixed(1) + 'KB';
    } else if(number >= 1048576) {
        return (number/1048576).toFixed(1) + 'MB';
    }

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
    $$('#setImg').on('click', function(){
        //console.log('img seteada');

    } );
    $$('#in').on('change',function(){


        const obj = $$(this)[0];
        const currentFiles = obj.files;
        console.log(currentFiles);
        var icon = '';

        if(currentFiles.length!=0){
            for(let i=0;i<currentFiles.length;i++){
                //console.log(currentFiles[i].name);
                var typeFile = currentFiles[i].type;

                /*if(typeFile.includes('image')){
                    console.log('imagen');
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




})
  
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
      },
      {
        path: '/regis_login_panel/',
        url: 'regis_login_panel.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

});

// Option 1. Using one 'page:init' handler for all pages
/*
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})
*/

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="regis_login_panel"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log('regis_login_panel.html');
    app.toolbar.show('.toolbar');
})

$$(document).on('page:init', '.page[data-name="me"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log('me.html');
    app.toolbar.show('.toolbar');
})

$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    // Do something here when page with data-name="about" attribute loaded and initialized
    console.log('index.html');
})
requirejs.config({
    paths: {
        'text': 'require/text',
        'durandal':'durandal/js',
        'plugins' : 'durandal/js/plugins',
        'transitions' : 'durandal/js/transitions',
        'knockout': 'knockout/knockout-3.1.0',
        'jquery': 'jquery/jquery-1.9.1',
        'axios': 'axios/axios'
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator'],  function (system, app, viewLocator) {
    //>>excludeStart("build", true);
    system.debug(false);
    //>>excludeEnd("build");

    app.title = 'Durandal Todo';

    app.configurePlugins({
        router:true,
        dialog: false
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();
        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});

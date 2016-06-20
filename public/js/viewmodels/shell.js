define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        activate: function () {
            router.map([
              { route: '', title: 'TodoApp', moduleId: 'viewmodels/todo', nav: true },
            ]).buildNavigationModel();

            return router.activate();
        }
    };
});

  define(['viewmodels/shell', 'durandal/app', 'plugins/http', 'knockout', 'axios'], function (router, app, http, ko, axios) {

        var ViewModel = function () {
          var self = this;
          this.todoList = ko.observableArray([]);
          self.todoAdded = ko.observable();
          self.activeTodo = ko.observable();
          self.shouldEdit = ko.observable();
          self.editValue = ko.observable();

          self.getTodos = function(){
            axios.get('/todos.json')
            .then(function (response) {
              self.todoList(response.data);
            })
          };

          self.addToDo = function(){
            axios.put('/addToDo', {
              todo: self.activeTodo(),
              completed: false
            })
            .then(response => {
              self.todoAdded(true);
              self.refresh();
            }).catch(function (err) {
              console.log(err)
            });
          };

          self.editToDo = function(id, todo){
            self.shouldEdit(this.id);
            self.editValue(this.todo);
          };

          self.editSubmit = function(){
            axios.put('/updateToDo', {
              todo: self.editValue(),
              id: self.shouldEdit(),
              completed: this.completed
            })
            .then(response => {
              self.todoAdded(true);
              self.refresh();
            }).catch(function (err) {
              console.log(err)
            });
          }

          self.completeToDo = function(id, todo){
            axios.put('/updateToDo', {
              todo: this.todo,
              id: this.id,
              completed: true
            })
            .then(response => {
              self.refresh();
            }).catch(function (err) {
              console.log(err)
            });
          }

          self.deleteToDo = function(){
            axios.delete('/deleteTodo?id='+ this.id)
            .then(response => {
              self.refresh();
            }).catch(function (err) {
              console.log(err)
            });
          }

          self.clearToDo = function(){
            axios.delete('/clearTodo?completed=true')
            .then(response => {
              self.refresh();
            }).catch(function (err) {
              console.log(err)
            });
          }

          self.refresh = function(){
            self.getTodos();
            self.editValue("");
            self.activeTodo("");
            self.shouldEdit("");
          };

          self.activate = function () {
              self.activeTodo("");
              self.editValue("");
              self.getTodos();
              self.todoAdded(false);
          }

        }

        return ViewModel;

});

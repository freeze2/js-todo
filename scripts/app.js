'use strict';

(function(){

  var TodoElement = function (container_id) {
    this.container = document.getElementById(container_id);
    this.taskList = [];
    this.itemCounter = 0;
  };

  TodoElement.prototype = {

    addTask: function (input) {
      var currentText = input.value;

      this.taskList.push({"name": currentText, "done": false, "id": this.itemCounter});

      this.itemCounter++;

      this.taskList.sort(function (a, b) {
        a = a.name.toLowerCase();
        b = b.name.toLowerCase();

        return (a < b) ? -1 : (a > b) ? 1 : 0;
      });

      //console.log(this.taskList);
    },

    renderTasks: function (ul) {
      ul.innerHTML = '';
      for(var i = 0; i < this.taskList.length; i += 1){
        var currentItem = document.createElement('li');
            //doneClass    = this.taskList[i].done ? 'element-task-done' : '';
        this.taskList[i].done ? currentItem.className = 'element-task-done' : null;
        currentItem.innerHTML = '<span>' + this.taskList[i].name + '</span>';
        currentItem.innerHTML += ' <a href="#" class="done-task done-' + this.taskList[i].id + '">task done</a>';
        currentItem.innerHTML += ' <a href="#" class="edit-task edit-' + this.taskList[i].id + '">edit</a>';
        currentItem.innerHTML += ' <a href="#" class="delete-task delete-' + this.taskList[i].id + '">delete</a>';
        ul.appendChild(currentItem);
      }
    },

    editTask: function () {

    },

    init: function(){
      var ul            = document.createElement('ul'),
          addTaskInput  = document.createElement('input'),
          addTaskButton = document.createElement('button');

      var buttonText = document.createTextNode('Add a new task');
      addTaskButton.appendChild(buttonText);
      addTaskButton.className = 'add-task-button';

      this.container.appendChild(ul);
      this.container.appendChild(addTaskInput);
      this.container.appendChild(addTaskButton);

      var self = this;

      document.querySelector('body').addEventListener('click', function(event) {
        //console.log(event.target.classList);
        var currentLi = event.target.parentNode;
        //var id = currentLi.childNodes('a')[0].classList[1].match(/\d+/)[0];

        if (event.target.tagName.toLowerCase() === 'button') {
          switch (event.target.classList[0]){
            case 'add-task-button':
              if(!addTaskInput.value) return false;
              self.addTask(addTaskInput);
              self.renderTasks(ul);
              break;
            case 'edit-task-button':
              //currentLi.childNodes[0].innerHTML = currentLi.childNodes[7].value;

              for(var j = 0; j < self.taskList.length; j += 1) {
                if (self.taskList[j].id == currentLi.childNodes[2].classList[1].match(/\d+/)[0])
                  self.taskList[j].name = currentLi.childNodes[7].value;
              }

              self.renderTasks(ul);

              console.log(currentLi.childNodes[0]);

              //currentLi.className = '';
              break;
          }
        }

        if (event.target.tagName.toLowerCase() === 'a') {
          switch (event.target.classList[0]){
            case 'done-task':
              for(var i = 0; i < self.taskList.length; i += 1) {
                if (self.taskList[i].id == event.target.classList[1].match(/\d+/)[0])
                  self.taskList[i].done = true;
              }
              self.renderTasks(ul);
              break;
            case 'edit-task':
             //var currentLi = event.target.parentNode;

              if (currentLi.classList[0] == 'element-task-done' || currentLi.classList[0] == 'on-edit')
                break;

              currentLi.className = 'on-edit';

              var taskText      = currentLi.childNodes[0].innerHTML,
                  newTextInput  = document.createElement('input'),
                  newTextButton = document.createElement('button');

              var buttonSaveText = document.createTextNode('save');
              newTextButton.appendChild(buttonSaveText);
              newTextButton.className = 'edit-task-button';

              newTextInput.value = taskText;

              currentLi.appendChild(newTextInput);
              currentLi.appendChild(newTextButton);

              break;
            case 'delete-task':
              for(var k = 0; k < self.taskList.length; k += 1) {
                if (self.taskList[k].id == event.target.classList[1].match(/\d+/)[0])
                  self.taskList.splice(k, 1);
              }
              self.renderTasks(ul);
              break;
            default:
              return false;
          }

        }
      });
    }

  };


  var todo = new TodoElement('container');
  todo.init();

})();
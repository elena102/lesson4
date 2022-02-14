
var express = require('express');
var bodyParser = require("body-parser");
//затем вызываем экспресс 
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
//визуализировать css-файлы
app.use(express.static("public"));

//массив задач с начальными заполнителями для добавленной задачи
var task = ["купить носки"];

//массив выполненных задач с начальными заполнителями для удаленной задачи
var complete = ["finish jquery"];

//отправить маршрут для добавления новой задачи
app.post('/addtask', function (req, res) { 
  var newTask = req.body.newtask;
//добавить новую задачу из почтового маршрута
  task.push(newTask);
 //после добавления в массив возвращаемся к корневому маршруту  
  res.redirect("/");
});
app.post("/removetask", function(req, res) {
  var completeTask = req.body.check;
//выберите выполненную задачу, а затем добавьте в полную проверку задач для "typeof" различия
  if (typeof completeTask === "string") {
    complete.push(completeTask);
//проверьте, существует ли уже выполненная задача в задаче при проверке, затем удалите ее
    task.splice(task.indexOf(completeTask), 1);

    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/");
});

//визуализировать ejs и отображать добавленную задачу, завершенную задачу
app.get("/", function(req, res) {
  res.render("index", { task: task, complete: complete });
});

//сервер прослушивает порт 3000 для подключений 
app.listen(3000, function() {
  console.log("server is running on port 3000");
});
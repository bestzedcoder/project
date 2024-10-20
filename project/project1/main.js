var courseAPI ='http://localhost:3000/courses'

function start(){
    getCourses(renderCourse);
    handleCreateForm();
}
start();

function getCourses(callback){
    fetch(courseAPI)
                    .then(function(response){
                          return response.json();
                    })
                    .then(callback);
}

function renderCourse(courses) {
    var listCoursesBlock = document.querySelector('#list-courses');
    
    var htmls = courses.map(function(course) {
        return `
          <li class="item-${course.id}">
                <h3>${course.name}</h3>
                <p>${course.description}</p>
               <button onclick="handleDeleteCourse(\`${course.id}\`)">xóa</button>
               <button onclick="handleUpdateCourse(\`${course.id}\`)">sửa</button>
          </li>
        `
    })
    listCoursesBlock.innerHTML = htmls.join('');
}
function createCourse(data,callback) {
    var option = {
        method :'POST',
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    };
    fetch(courseAPI , option)
                            .then(function(response){
                                return response.json();
                            })
                            .then(callback);
}

function handleCreateForm(){
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(){
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
  
       var formData = {
            name : name ,
            description : description
       };
       createCourse(formData , function(){
           getCourses(renderCourse);
       });
    }
    
}

function handleDeleteCourse(id){
    var option = {
        method :'DELETE',
        headers: {"Content-Type": "application/json"}
    };
    fetch(courseAPI + '/' + id, option)
                            .then(function(response){
                                return response.json();
                            })
                            .then(function(){
                                getCourses(renderCourse);
                            });
}

function handleUpdateCourse(id){
    var block = document.querySelector(`.item-${id}`); // lấy vị trí của element chứa phần tử cần chỉnh sửa
    var update = document.querySelector('#update');
    block.classList.add('hidden');//ẩn block cần chỉnh sửa
    update.classList.remove('hidden')//hiện nút update
    var nameText = block.querySelector('h3').textContent;
    var descriptionText = block.querySelector('p').textContent;
    //hiển thị content trên thanh input
    document.querySelector('input[name="name"]').value = nameText;
    document.querySelector('input[name="description"]').value = descriptionText;
    update.onclick = function(){
            var formData = 
            { 
                name : document.querySelector('input[name="name"]').value,
                description : document.querySelector('input[name="description"]').value  
            }
            var option = {
                method :'PUT',
                body: JSON.stringify(formData),
                headers: {"Content-Type": "application/json"}
            };
            fetch(courseAPI +'/'+id , option)
                                    .then(function(response){
                                        return response.json();
                                    })
                                    .then(function(){
                                        getCourses(renderCourse);
                                        block.classList.remove('hidden');
                                        update.classList.add('hidden');
                                    });
    }
}
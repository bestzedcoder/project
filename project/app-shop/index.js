
document.querySelector('.category-list').addEventListener('mouseover', function(e) {
    // Kiểm tra xem phần tử đã hover có lớp 'category-item' hay không
    const categoryItem = e.target.closest('.category-item');
    
    if (categoryItem) {
        // Xóa class 'category-item--active' khỏi phần tử hiện tại đang active
        const activeItem = document.querySelector('.category-item--active');
        if (activeItem) {
            activeItem.classList.remove('category-item--active');
        }
        
        // Thêm class 'category-item--active' vào phần tử hiện tại
        categoryItem.classList.add('category-item--active');

        // Xóa class khi chuột rời khỏi phần tử
        categoryItem.addEventListener('mouseout', function() {
            categoryItem.classList.remove('category-item--active');
        });
    }

    document.querySelector('category-item--active').addEventListener('click' , function() {

    })
});

const downIcon = document.querySelector('.select-input__icon-down');
const upIcon = document.querySelector('.select-input__icon-up');
const list = document.querySelector('.select-input__list');

downIcon.onclick = function() {
    downIcon.classList.remove('select-input__icon--active');
    upIcon.classList.add('select-input__icon--active');
    list.style.display = 'block';
}

upIcon.onclick = function() {
    upIcon.classList.remove('select-input__icon--active');
    downIcon.classList.add('select-input__icon--active');
    list.style.display = 'none';
}



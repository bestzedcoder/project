//thông báo toast
function toast({ 
    title = '',
    message = '', 
    type = '', 
    duration = 0
}){
   const main = document.getElementById('toast');
   if(main) {
    const toast = document.createElement('div');

    const autoRemoveID = setTimeout(function() {
        main.removeChild(toast);
    }, duration + 1000)

    toast.onclick = function(e) {
        if(e.target.closest('.toast__close'))
        {
            main.removeChild(toast);
        }
        clearTimeout(autoRemoveID);
    }
    const icons = {
        success : 'fa-regular fa-circle-check',
        warning : 'fa-solid fa-circle-exclamation',
        error : 'fa-regular fa-circle-xmark',
        info : 'fa-solid fa-circle-info'
    }
    const icon = icons[type];
    const delay = (duration/1000).toFixed(2);
    toast.classList.add('toast',`toast--${type}`);
    toast.style.animation = ` slideInLeft ease 0.3s , fadeOut linear 1s ${delay}s forwards`
    toast.innerHTML = `
        <div class="toast__icon">
            <i class="${icon}"></i>
        </div>
        <div class="toast__body">
            <h3 class="toast__title">${title}!</h3>
            <p class="toast__message">${message}</p>
        </div>
        <div class="toast__close">
            <i class="fa-regular fa-circle-xmark"></i>
        </div>
    `;
    main.appendChild(toast);
   }
};

function showSuccessToast() {
    toast({
    title : 'Success',
    message : 'Bạn đã đăng nhập thành công!', 
    type : 'success', 
    duration : 5000
    });
}


function showWarningToast() {
    toast({
    title : 'Warning',
    message : 'Bạn đã đăng nhập thành công', 
    type : 'warning', 
    duration : 5000
    });
}


function showInfoToast() {
    toast({
    title : 'Infor',
    message : 'Bạn đã đăng nhập thành công', 
    type : 'infor', 
    duration : 5000
    });
}

function showErrorToast() {
    toast({
    title : 'Error',
    message : 'Bạn đã đăng nhập thất bại!', 
    type : 'error', 
    duration : 5000
    });
}
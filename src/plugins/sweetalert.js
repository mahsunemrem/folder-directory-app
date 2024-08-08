import Swal  from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });


  function error(title, text){
    Toast.fire({
        icon: "error",
        title: title,
        text:text
      }); 
  }

  function success(title, text){
    Toast.fire({
        icon: "success",
        title: title,
        text:text
      }); 
  }
  export default {error,success};


import React from 'react'
import Swal from 'sweetalert2'
const SweetAlert = (a, b, c, d) => {

   b === "Removed" ? Swal.fire({
      position: 'center',
      icon: a,
      title: b,
      text: c,
      timer: d,
      showConfirmButton: false,
      timerProgressBar: true,
      showCloseButton: true,
   }) : b === 'Order Placed!' ? Swal.fire({
      position: 'center',
       icon: a,
      title: b,
      text: c,
      timer: d,
      confirmButtonText: 'Continue Shopping',
      showCloseButton: false,
     timerProgressBar: true,
     showConfirmButton: true,
   }) :
     
   Swal.fire({
      icon: a,
      title: b,
      text: c,
      timer: d,
      position: 'center',
      showConfirmButton: false,
      })

}

export default SweetAlert
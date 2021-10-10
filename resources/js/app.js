import axios from 'axios'
import Noty from 'noty'
import { initAdmin } from './admin'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')


function updateCart(art) {
    axios.post('/update-cart', art).then(res => {
        
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type:'success',
            timeout:1000,
            text: 'Item successfully added to cart',
            progressBar: false,
            layout: 'topLeft'
        }).show();
    }).catch(err => {
        new Noty({
            type:'error',
            timeout:1000,
            text: 'Something went wrong',
            progressBar: false,
            layout: 'topLeft'
        }).show;
    })

}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) =>{
        let art = JSON.parse(btn.dataset.art)
        updateCart(art)
        console.log(art)
    })
})

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}


initAdmin()
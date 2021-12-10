import axios from 'axios'
import Noty from 'noty'
import { initAdmin } from './admin'
import moment from 'moment'

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

// Change order status
let statuses = document.querySelectorAll('.status_line')

console.log(statuses)
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order=JSON.parse(order)
let time = document.createElement('small')


function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })


    let stepCompleted = true;
    statuses.forEach((status) => {
        let dataProp = status.dataset.status
        if(stepCompleted){
            status.classList.add('step-completed')
        }
        if(dataProp === order.status){
            stepCompleted = false
            time.innerText=moment(order.updatedAt).format('HH:mm:ss ---- YYYY-MM-DD ')
            status.appendChild(time)
            if(status.nextElementSibling){
            status.nextElementSibling.classList.add('current')
        }
        }

    })

}

updateStatus(order);


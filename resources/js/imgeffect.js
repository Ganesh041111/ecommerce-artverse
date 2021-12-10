let zoom = document.querySelectorAll('.zoom');

zoom.addEventListener('mousemove', function (e) {
 let width = zoom.offsetWidth;
 let height = zoom.offsetHeight;
 let mouseX = e.offsetX;
 let mouseY = e.offsetY;
 
 let bgPosX = (mouseX / width * 100);
 let bgPosY = (mouseY / height * 100);
 
 zoom.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
});

zoom.addEventListener('mouseleave', function () {
    zoom.style.backgroundPosition = "center";
});
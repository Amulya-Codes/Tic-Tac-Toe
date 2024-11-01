const homepage = document.querySelector(".homepage");
const selectPlayerBtn = document.getElementById('select-player-btn');
const SelectPlayerPage = document.querySelector('.select-player-container');

selectPlayerBtn.addEventListener('click', function(){
    homepage.style.display = 'none';
    SelectPlayerPage.style.display = 'block';
})

const footer = document.querySelector('#footer-container');

const setFooter = () => {
    var quote = document.createElement('div');
    quote.setAttribute("class", "w3-container w3-black w3-center w3-opacity w3-padding-64");
    quote.innerHTML = '<h1 class="w3-margin w3-xlarge">Quote of the day: Expect problems and eat them for breakfast.</h1>';
    
    footer.appendChild(quote);
    
    var icons = document.createElement('footer');
    icons.setAttribute("class", "w3-container w3-padding-64 w3-center w3-opacity");
    
    var iconDiv = document.createElement('div');
    iconDiv.setAttribute("class", "w3-xlarge w3-padding-32");
    
    iconDiv.innerHTML = '<i class="fa fa-facebook-official w3-hover-opacity"></i> ';
    iconDiv.innerHTML += '<i class="fa fa-instagram w3-hover-opacity"></i> ';
    iconDiv.innerHTML += '<i class="fa fa-snapchat w3-hover-opacity"></i> ';
    iconDiv.innerHTML += '<i class="fa fa-pinterest-p w3-hover-opacity"></i> ';
    iconDiv.innerHTML += '<i class="fa fa-twitter w3-hover-opacity"></i> ';
    iconDiv.innerHTML += '<i class="fa fa-linkedin w3-hover-opacity"></i>';
    
    icons.appendChild(iconDiv);
    footer.appendChild(icons);
}

setFooter();


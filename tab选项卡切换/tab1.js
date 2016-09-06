window.onload=function(){
    var oHead=document.getElementsByClassName('head')[0];
    var oLi=oHead.getElementsByTagName('li');
    var oDiv=document.getElementsByClassName('table-list');
    for(var i=0;i<oLi.length;i++){
        oLi[i].onclick=function(_i){
            return function(){
                for(var x=0;x<oDiv.length;x++){
                    oDiv[x].style.display='none';
                }
                oDiv[_i].style.display='block';
                for(var j=0;j<oLi.length;j++){
                  oLi[j].className="";  
                }
                oLi[_i].className="active";
            }
        }(i);
    }
};
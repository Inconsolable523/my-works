window.onload=function(){
	var oDiv=document.getElementsByClassName('m1')[0];
	var list=document.getElementsByTagName('h1')[0];
	var ull=oDiv.getElementsByTagName('ul')[0];
	
	list.onclick=function(){
		if(oDiv.style.display=='none'){
			oDiv.style.display='block';
		}
		else{
			oDiv.style.display='none';
		}
	}
	
	
};
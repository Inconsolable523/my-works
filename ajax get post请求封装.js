//ajax请求get方法的封装
function get(url,options,callback){
// url{String}    请求资源的url
// options{Object}    请求的查询参数
// callback{Function}    请求的回调函数
var xhr=new XMLHttpRequest();
xhr.onreadystatechange=function(callback){
	if(xhr.readyState==4){
		if((xhr.status>=200&&xhr.status<300)||xhr.status==304){
			callback(xhr.responseText);
		}else{
			alert('Requst was unsuccessful:'+xhr.status);
		}
	}
};
xhr.open('get',url+'?',serialize(options),true);
xhr.setRequestHeader('myHeader','myVAlue');
xhr.send(null);
}
function serialize(data){
	if(!data) return '';
    var pairs = [];
    for(var name in data){
        if(!data.hasOwnProperty(name)) continue;
        if(typeof data[name] === 'function') continue;
        var value = data[name].toString();
        name = encodeURIComponent(name);
        value = encodeURIComponent(value);
        pairs.push(name + '=' + value);
    }
    return pairs.join('&');

}

function post(url, options, callback) {
    //xhr兼容
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    //当请求被发送到服务器时，我们需要执行一些基于响应的任务。每当 readyState 改变时，就会触发 onreadystatechange 事件。
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            //http 状态码 200到300是指服务端正常返回;304是告诉客户端取缓存数据
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                callback(xhr.responseText);
            } else {
                alert("请求错误：" + xhr.status + " " + xhr.statusText);
            }
        }
    };
//与 get 不同的地方
    xhr.open('post', url, true);
    xhr.send(serialize(options));
}
/**
 * 序列化对象为查询字符串
 * @param data {Object} 请求序列化的对象
 * @return {String}
 */
function serialize(data) {
    if(!data) return '';
    var pairs = [];
    for(var name in data) {
        if(!data.hasOwnProperty(name)) continue;
        if(typeof data[name] === 'function') continue;
        var value = data[name].toString();
        name = encodeURIComponent(name);
        value = encodeURIComponent(value);
        pairs.push(name + '=' + value);
    }
    return pairs.join("&");
}	

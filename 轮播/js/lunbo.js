window.onload = function () {
    var ctr = document.getElementById('container');
    var list = document.getElementById('list');
    var btn1 = document.getElementById('button');
    var btn = btn1.getElementsByTagName('span');
    var left = document.getElementsByClassName('left')[0];
    var right = document.getElementsByClassName('right')[0];
    var index = 1;
    var time;

    left.onclick = function () {
        index = index - 1;
        showbtn();
        pianyi(600);
    }
    right.onclick = function () {
        index = index + 1;
        showbtn();
        pianyi(-600);
    }
    function pianyi(offset) {
        var myoffset = parseInt(list.style.left) + offset;
        var timer = 300;//总时间
        var internal = 10;//时间间隔
        var speed=offset/(timer/internal);//移动的位移
    
        function go() {
            if ((speed < 0 && parseInt(list.style.left) > myoffset) || (speed > 0 && parseInt(list.style.left) < myoffset)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, internal);
            }
            else {
                list.style.left = myoffset + 'px';
                if (myoffset > -600) {
                    list.style.left = '-2400px';
                }
                if (myoffset < -2400) {
                    list.style.left = '-600px';
                }
            }
        }
    
        go();
    }
    
    function showbtn() {
        for (var i = 0; i < btn.length; i++) {
            if (btn[i].className == 'on') {
                btn[i].className = ' ';
            }
        }
        if (index > 4) {
            index = 1;
        }
        if (index < 1) {
            index = 4;
        }
        btn[index - 1].className = 'on';

    }

    for (var j = 0; j < btn.length; j++) {
        btn[j].onclick = function () {
            var newoffset = parseInt(this.getAttribute('index'));
            var offset = -600 * (newoffset - index);
            pianyi(offset);
            index = newoffset;
            showbtn();
        }
    }
    function play() {
        time = setInterval(function () {
            right.onclick();
        }, 3000)
    }

    function stop() {
        clearInterval(time);
    }

    ctr.onmouseover = stop;
    ctr.onmouseout = play;
    play();

}
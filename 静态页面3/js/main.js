/**
 *  Created by zhichao on 16/9/19.
 */
require.config({
    shim: {
        'jquery.md5': {
            deps: ['jquery']
        }
    }
});

define(['jquery', 'js.cookie', 'jquery.md5','Juicer'], function ($, Cookies) {
    var index = {
        init: function () {
            index.topbarControl.init();
            index.star.init();
            index.login.init();
            index.lunbo();
            index.contentSwitch();
            index._getCorseCard();

        },
        //顶栏不再提示
        topbarControl: {
            init: function () {
                var $pre = $("#J_presentation");
                if (Cookies.get('prelose') !== 'true') {
                    $pre.fadeIn();
                }

                $("#J_delete").bind("click", function () {
                    Cookies.set('prelose', 'true', {expires: 7, path: '/'});
                    $pre.fadeOut();
                });
            }
        },
        //关注"网易"
        star: {
            init: function () {
                var self = this;

                $("#J_nav-care").bind("click", function () {
                    //如果未设置cookie,弹出登录框
                    //Cookies.remove('loginSuc', {path: '/'});//FIXME:测试
                    if (Cookies.get('loginSuc') !== 'true') {
                        $("#J_login").show();
                        $("#J_background").show();
                    } else {
                        index.login._followed();
                    }
                });
                self._remove();

            },
            //取消关注
            _remove: function(){
                $("#J_remove").bind("click",function(){
                    $('#J_nav-care').show();
                    $('#J_followed').hide();
                    var fans = parseInt($("#J_fans span").html());
                    $("#J_fans span").html(fans - 1);
                })
            }

        },
        //登录
        login: {
            init: function () {
                var self = this;
                var data = {
                    userName: '',
                    password: ''
                };

                $("#J_login-in").on("click", function () {
                    data.userName = $.md5($('#J_uname').val().trim());
                    data.password = $.md5($('#J_upassword').val());
                    $.get('http://study.163.com/webDev/login.htm', data, function (a) {
                        if (a == 1) {
                            //登录成功

                            Cookies.set('loginSuc', 'true', {expires: 7, path: '/'});
                            $("#J_login-in").html('登录成功');
                            setTimeout(function () {
                                $("#J_login").hide();
                                $("#J_background").hide();
                            },1000);

                            self._followed();
                        }
                        else {
                            alert("账号或密码错误");
                        }
                    })
                });
                self._close();
            },
            _followed: function () {
                $.get('http://study.163.com/webDev/attention.htm',function(b){
                    if(b==1){
                        //设置关注成功cookie
                        Cookies.set('followSuc', 'true', {expires: 7, path: '/'});
                        $('#J_nav-care').hide();
                        $('#J_followed').show();
                        var fans = parseInt($("#J_fans span").html());
                        $("#J_fans span").html(fans + 1);
                    }
                    else {
                        alert("关注失败!");
                    }

                })


            },
            _close: function(){
                $("#J_close").bind("click",function(){
                    $("#J_login").hide();
                    $("#J_background").hide();
                })
            }
        },
        //轮播(混乱ing)
        //lunbo:function() {
        //    var $btn=$("#J_btn span");
        //    var b_index=-2;
        //    var timer=null;
        //    function autoplay() {
        //        timer=setInterval(function () {
        //            var prvoffset=$('#J_banner').position().left;
        //            showbtn();
        //            b_index=b_index+1;
        //            if(b_index>2){
        //                b_index=0;
        //            }
        //            if(prvoffset<-1654){
        //                $("#J_banner").offset({left:0});
        //            }else {
        //           $('#J_banner').offset(function(n,c){
        //               newPos=new Object();
        //               newPos.left= c.left-1654;
        //               return newPos;
        //           })
        //
        //            }
        //        }, 5000);
        //    }
        //    function showbtn(){
        //            $("#J_btn span").removeClass('on');
        //            $("#J_btn span").eq(b_index).addClass('on');
        //
        //        }
        //    $("#J_btn span").bind("click",function(){
        //        var prvoffset=$('#J_banner').position().left;
        //        var chose=$(this).attr('index');
        //        if(prvoffset<-1654){
        //            $("#J_banner").offset({left:0});
        //        }else {
        //            $('#J_banner').offset(function(n,c){
        //                newPos=new Object();
        //                newPos.left= c.left-chose*1654;
        //                return newPos;
        //            })
        //
        //        }
        //    })
        //    $("#J_banner").bind("mouseover",function(){
        //        clearInterval(timer);
        //    })
        //    autoplay();
        //}
        //新轮播
        lunbo:function() {
            var $img = $("#J_banner img");
            var $btn = $("#J_btn span");
            var b_index = 1;
            var timer = null;
            //自动播放
            _autoplay();
            //鼠标悬停,暂停播放
            $img.bind("mouseover",function(){
                clearInterval(timer);
            })
            //点击按钮,实现相应图片跳转
            $btn.bind("click",function(){
                var getNumber=$(this).attr("J_index");
                console.log(getNumber);
                _turnBanner(getNumber);
            })
            //自动播放
            function _autoplay(){
                timer=setInterval(function(){
                    _turnBanner(b_index);
                    b_index++;
                    if(b_index>2){
                        b_index=0;
                    }
                },5000)
            }
            function _turnBanner(index){
                $img.fadeOut();
                $img.eq(index).fadeIn(500);
                $btn.removeClass('on');
                $btn.eq(index).addClass('on');
            }
        },
        //左侧内容区切换
        contentSwitch:function(){
                var $btn1=$("#J_change1");
                var $btn2=$("#J_change2");

                $btn1.bind("click",function(){
                    var dtd= $.Deferred(); //新建异步对象
                    $.when(index._getCorseCard(0,20,$btn1.attr("data-type"),dtd)).done(function(){
                        $btn2.removeClass("checked");
                        $btn1.addClass("checked");
                    })
                });
                $btn2.bind("click",function(){
                    var dtd= $.Deferred();
                    $.when(index._getCorseCard((0,20,$btn2.attr("data-type"),dtd))).done(function(){
                        $btn1.removeClass("checked");
                        $btn2.addClass("checked");
                    })
                })
            },
            /**
             * 获取课程卡片
             * @param pageNo    页码
             * @param psize     每页个数
             * @param type      分类
             * @param dtd       异步对象
             */
            _getCorseCard:function(pageNo,psize,type,dtd){
                var param={
                    pageNo:pageNo,
                    psize:psize,
                    type:type
                },
                    $showPicture=$("#J_main-picture");
                $showPicture.html("内容加载中");
                $.get('http://study.163.com/webDev/couresByCategory.htm',param,function(rsp){
                    var tpldata={};//新建对象
                    rsp=JSON.parse(rsp);//JSON.parse()将字符串解析为JSON对象
                    tpldata.list=rsp.list;

                    $showPicture.html("");
                    var cont= juicer($("#courseTpl").html(),tpldata);
                    $showPicture.html(cont);


                })

            }

    };


    index.init();
});
(($)=>{
    
    class Pofo{
        init(){
            this.header();
            this.section1();
            this.section2();
            this.section3();
            this.section4();
            this.section5();
            this.section6();
            this.section7();
            this.section8();
            this.section9();

            this.footer();
            this.gotop();
            this.quick();
        }
        header(){
                let y='';
                let newTop=0;
                let oldTop=0;
                let t=false;
                let t2=false;

            
            $(window).scroll(function(){

                newTop=$(window).scrollTop();

                y = oldTop - newTop > 0 ? 'UP':'DOWN';

                if(y==='DOWN'){
                    $('#header').addClass('up');
                    
                }

                if(y==='UP'){
                    $('#header').removeClass('up');
                    $('#header').addClass('h60');
                }
                oldTop=newTop;

                if($(window).scrollTop()===0){
                    $('#header').removeClass('up');
                    $('#header').removeClass('h60');
                }

            });

            $('.mobile-btn').on({
                click:function(e){
                    e.preventDefault();
                    $(this).toggleClass('on');
                    $('#nav').stop().slideToggle(300);
                 }
            });
            
            $('.sub').stop().slideUp(0);

            $(window).resize(function(){

                resizeNav();

            });
            resizeNav();
            function resizeNav(){
                if($(window).width()<=1024){
                    $('#nav').stop().hide();
                    t2=false
                    if(t===false){
                        t=true;  
                        //마우스 오버 이벤트기능 삭제     
                        $('.sub').fadeOut(0);                   
                        $('.main-btn').off('mouseenter');        
                        $('.main-btn').bind({
                            click:function(event){                   
                               
                                $(this).next().stop().slideToggle(300);
                            }
                        });
                        
                    }      
                    
                }else{
                    $('#nav').stop().show();
                    $('.mobile-btn').removeClass('on')
                    t=false;
                    if(t2===false){
                        t2=true;
                        $('.main-btn').on('mouseenter'); 
                        $('.main-btn').off('click');
                        $('.sub').stop().slideUp(0);
                        $('.main-btn').on({
                            mouseenter:function(){                   
                                $('.sub').fadeOut(0);
                                $(this).next().fadeIn(300);
                            }
                        });
                        $('#nav').on({
                            mouseleave:function(){
                                $('.sub').fadeOut(300);
                            }
                        });
                        $('.sub-btn').on({
                            mouseenter:function(){
                                $('.sub-sub').fadeOut(0);
                                $(this).next().fadeIn(300);
                            }
                        })
                        $('.col24').on({
                            mouseleave:function(){
                                $('.sub-sub').fadeOut(0);
                            }
                        });
                    }
                    
                }
            }
            
           
        }
        section1(){
            let cnt=0;
            let setId=0;
            let setId2=0;
            let start=null;
            let end=null;
            let result='';

            
            
            let dragStart=null;
            let dragEnd=null;
            let mouseDown=false; 
            //너비와 높이 변경시 동작
            let winW=$(window).width();
            
            $(window).resize(function(){
                winW=$(window).width();
                mainSlide();
                return winW;
             });

            function mainSlide(){
                $('#section1 .slide-wrap').stop().animate({left:-winW*cnt},300,function(){
                    cnt>2?cnt=0:cnt;
                    cnt<0?cnt=2:cnt;
                    $('#section1 .slide-wrap').stop().animate({left:-winW*cnt},0);
                })
            }
            function nextCount(){
                cnt++;
                mainSlide();
            }
            function prevCount(){
                cnt--;
                mainSlide();
            }
            function autoTimer(){
                setId=setInterval(nextCount,5000);
            }
             autoTimer();
            function timerfn(){
                let tCnt=0;
                clearInterval(setId);
                clearInterval(setId2);
                setId2=setInterval(function(){
                    tCnt++;
                    if(tCnt>=5){
                        
                        clearInterval(setId);
                        clearInterval(setId2);
                        autoTimer();
                    }
                },1000);
                
            }
           
           
          

           $('#section1 .slide-container').on({
            mousedown:function(e){
                timerfn();
                start = e.clientX;
                
                dragStart=e.clientX-$('.slide-wrap').offset().left-winW;                
                mouseDown=true;
            },
            mouseup:function(e){
                
                end = e.clientX;
                result= start-end > 0 ? "NEXT":"PREV";
                
                /*console.log('마우스시작 :',start);
                console.log('마우스끝 :',end);
                console.log('페이지이동 :',result);*/
                if(result==='NEXT'){
                    if(!$('#section1 .slide-wrap').is(':animated')){
                        nextCount();
                    }
                }if(result==='PREV'){
                    if(!$('#section1 .slide-wrap').is(':animated')){
                        prevCount();
                      }
                }
                mouseDown=false;
            },
            mousemove:function(e){
                if(mouseDown===false){
                    return;
                }
                dragEnd=e.clientX;
                $('.slide-wrap').css({left:dragEnd-dragStart});
                
            },
            mouseleave:function(e){
                if(mouseDown===false){
                    return;
                }
                end = e.clientX;
                result= start-end >0 ? "NEXT":"PREV";
                
                if(result==='NEXT'){
                    nextCount();
                    
                }else{
                    prevCount();
                    
                }
                mouseDown=false;
               
            }
           });

           $('#section1 .slide-container').on({
            touchstart:function(e){
                timerfn();
                start = e.originalEvent.changedTouches[0].clientX;                        
                dragStart =  e.originalEvent.changedTouches[0].clientX-$('.slide-wrap').offset().left-winW;  //반드시 초기값 0셋팅
                mouseDown = true;
                
            },
            touchend:function(e){
                end = e.originalEvent.changedTouches[0].clientX;  
                result = start-end > 0 ? 'NEXT' : 'PREV';
                if(result==='NEXT'){
                  if(!$('#section1 .slide-wrap').is(':animated')){
                    nextCount(); 
                  }                  
                }
                if(result==='PREV'){
                  if(!$('#section1 .slide-wrap').is(':animated')){
                    prevCount();
                  }
                }
               
                mouseDown = false;
            },
            touchmove: function(e){ 
                if(mouseDown===false){
                    return;
                }
                dragEnd = e.originalEvent.changedTouches[0].clientX;
                $('#section1 .slide-wrap').css({left: dragEnd-dragStart }); 
            }





           });


        }
        section2(){
            //스크롤이벤트
            const sec2Top=$('#section2').offset().top-$(window).height();
            $(window).scroll(function(){
                if($(window).scrollTop()>sec2Top){
                $('#section2').addClass('sec2Ani');
                return;

                
                }
                if($(window).scrollTop()===0){
                    $('#section2').removeClass('sec2Ani');
                    return;
                }
            });
            
            
        }
        section3(){
            //스크롤이벤트
            const sec3Top=$('#section3').offset().top-$(window).height();
            $(window).scroll(()=>{
                
                if($(window).scrollTop()>sec3Top){
                $('#section3').addClass('sec3Ani');
                return;

                
            }
            if($(window).scrollTop()===0){
                $('#section3').removeClass('sec3Ani');
                return;
            }
            });
        }
        section4(){

            let idx=0;
            let winW=$(window).width();
            let cols=4;
            let imgW=winW/cols;
            let imgH=imgW*0.8125;
            

            let n=$('#section4 .gallery-list').length;
            
            let h=$('#section4 .gallery-list.hide').length;
            let rows=Math.ceil((n-h)/cols);



            const sec4Top=$('#section4').offset().top-$(window).height();
            let scr=false;

            $(window).scroll(function(){
                if($(window).scrollTop()>sec4Top){
                    if(scr===false){
                        scr=true;
                        $('#section4').addClass('sec4ani');
                    }
                    
               
                }
                if($(window).scrollTop()===0){
                    $('#section4').removeClass('sec4ani');
                    scr=false;
                    return;
                }
            });
           
            setTimeout( galleryMain(),100);
            $(window).resize(function(){
                galleryMain();
            });

            $('#section4 .gallery-btn').each(function(index){
                $(this).on({
                    click:function(e){
                        e.preventDefault();
                        idx=index; 
                        galleryMain();

                        $('#section4 .gallery-btn').removeClass('on');
                        $('#section4').removeClass('sec4ani');
                        $(this).addClass('on');
                    }
                });
            });

            function galleryMain(){

                winW=$(window).width();
                imgW=winW/cols;
                imgH=imgW*0.8125;
                

                if(winW>=1280){
                    cols=4;
                }else if(winW>=1024){
                    cols=3;
                }else if(winW>=600){
                    cols=2;
                }else{
                    cols=1;
                }
                
                $('#section4 .gallery-list').stop().animate({width:imgW,height:imgH});
                $('#section4 .img-wrap').css({width:imgW});
                $('#section4 .gallery-list').removeClass('zoomIn');
                $('#section4 .gallery-list').removeClass('hide');


                if(idx===0){
                    
                    switch(cols){
                        case 4:
                            $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0},300);
                            $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0},300);
                            $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0},300);
                            $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*3,top:imgH*0},300);
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1},300);
                            $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1},300);
                            $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*2,top:imgH*1},300);
                            $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*3,top:imgH*1},300);
                        break;
                        case 3:
                            $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0},300);
                            $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0},300);
                            $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0},300);
                            $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*1},300);
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*1,top:imgH*1},300);
                            $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*2,top:imgH*1},300);
                            $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*2},300);
                            $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*2},300);
                        break;
                        case 2:
                            $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0},300);
                            $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0},300);
                            $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1},300);
                            $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*1,top:imgH*1},300);
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*2},300);
                            $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*2},300);
                            $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*3},300);
                            $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*3},300);
                        break;
                        default :
                            $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0},300);
                            $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*1},300);
                            $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*2},300);
                            $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*3},300);
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*4},300);
                            $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*5},300);
                            $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*6},300);
                            $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*7},300);
                    }

                    
                    
                }
                else if(idx===1){
                    
                    switch(cols){
                        case 4:
                            $('#section4 .gallery-list').eq(0).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(2).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(3).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(5).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(6).hide().addClass('hide');
        
                            $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0},300);                   
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*1,top:imgH*0},300);                    
                            $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*2,top:imgH*0},300);
                        break;
                        case 3:
                            $('#section4 .gallery-list').eq(0).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(2).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(3).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(5).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(6).hide().addClass('hide');

                            $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0},300);                   
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*1,top:imgH*0},300);                    
                            $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*2,top:imgH*0},300);
                        break;
                        case 2:
                            $('#section4 .gallery-list').eq(0).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(2).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(3).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(5).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(6).hide().addClass('hide');

                            $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0},300);                   
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*1,top:imgH*0},300);                    
                            $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*1},300);
                        break;
                        default:
                            $('#section4 .gallery-list').eq(0).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(2).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(3).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(5).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(6).hide().addClass('hide');

                            $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0},300);                   
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1},300);                    
                            $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*2},300);
                    }
                    
                    
                }
                else if(idx===2){
                    
                    
                    switch(cols){
                        case 4:
                            $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0});
                            $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0});
                            $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0});                   
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*3,top:imgH*0});
                            $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*1});
                            $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*1,top:imgH*1});
        
                            $('#section4 .gallery-list').eq(3).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(7).hide().addClass('hide');
                        break;
                        case 3:
                            $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0});
                            $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0});
                            $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*2,top:imgH*0});                   
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1});
                            $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1});
                            $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*2,top:imgH*1});
        
                            $('#section4 .gallery-list').eq(3).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(7).hide().addClass('hide');
                        break;
                        case 2:
                            $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0});
                            $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*1,top:imgH*0});
                            $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1});                   
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*1,top:imgH*1});
                            $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*2});
                            $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*1,top:imgH*2});
        
                            $('#section4 .gallery-list').eq(3).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(7).hide().addClass('hide');
                        break;
                        default:
                            $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0});
                            $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*1});
                            $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*2});                   
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*3});
                            $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*4});
                            $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*5});

                            $('#section4 .gallery-list').eq(3).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(7).hide().addClass('hide');
                    }
                    
                }
                else if(idx===3){
                    
                    switch(cols){
                        case 4:
                            $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0});
                            $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0});
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0});
                            $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*3,top:imgH*0});
        
                            $('#section4 .gallery-list').eq(1).hide().addClass('hide');                    
                            $('#section4 .gallery-list').eq(3).hide().addClass('hide');                    
                            $('#section4 .gallery-list').eq(6).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(7).hide().addClass('hide');
                        break;
                        case 3:
                            $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0});
                            $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0});
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0});
                            $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*1});
        
                            $('#section4 .gallery-list').eq(1).hide().addClass('hide');                    
                            $('#section4 .gallery-list').eq(3).hide().addClass('hide');                    
                            $('#section4 .gallery-list').eq(6).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(7).hide().addClass('hide');
                        break;
                        case 2:
                            $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0});
                            $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0});
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1});
                            $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*1,top:imgH*1});
        
                            $('#section4 .gallery-list').eq(1).hide().addClass('hide');                    
                            $('#section4 .gallery-list').eq(3).hide().addClass('hide');                    
                            $('#section4 .gallery-list').eq(6).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(7).hide().addClass('hide');
                        break;
                        default:
                            $('#section4 .gallery-list').eq(0).show().stop().animate({left:imgW*0,top:imgH*0});
                            $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1});
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*2});
                            $('#section4 .gallery-list').eq(5).show().stop().animate({left:imgW*0,top:imgH*3});

                            $('#section4 .gallery-list').eq(1).hide().addClass('hide');                    
                            $('#section4 .gallery-list').eq(3).hide().addClass('hide');                    
                            $('#section4 .gallery-list').eq(6).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(7).hide().addClass('hide');
                    }

                    
                }
                else if(idx===4){
                    
                    switch(cols){
                        case 4:
                            $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*0});
                            $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*0});

                            $('#section4 .gallery-list').eq(0).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(1).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(2).hide().addClass('hide');                   
                            $('#section4 .gallery-list').eq(4).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(5).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(6).hide().addClass('hide');
                        break;
                        case 3:
                            $('#section4. gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*0});
                            $('#section4. gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*0});
        
                            $('#section4 .gallery-list').eq(0).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(1).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(2).hide().addClass('hide');                   
                            $('#section4 .gallery-list').eq(4).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(5).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(6).hide().addClass('hide');
                        break;
                        case 2:
                            $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*0});
                            $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*0});
        
                            $('#section4 .gallery-list').eq(0).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(1).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(2).hide().addClass('hide');                   
                            $('#section4 .gallery-list').eq(4).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(5).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(6).hide().addClass('hide');
                        break;
                        default:
                            $('#section4 .gallery-list').eq(3).show().stop().animate({left:imgW*0,top:imgH*0});
                            $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*1});
        
                            $('#section4 .gallery-list').eq(0).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(1).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(2).hide().addClass('hide');                   
                            $('#section4 .gallery-list').eq(4).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(5).hide().addClass('hide');
                            $('#section4 .gallery-list').eq(6).hide().addClass('hide');
                    }

                    
                    
                }
                else if(idx===5){
                    switch(cols){
                        case 4:
                            $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0});
                            $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0});
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0});
                            $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*3,top:imgH*0});
                            $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*1});
        
                            $('#section4 .gallery-list').eq(0).hide().addClass('hide');                    
                            $('#section4 .gallery-list').eq(3).hide().addClass('hide');                    
                            $('#section4 .gallery-list').eq(5).hide().addClass('hide');    
                        break;
                        case 3:
                            $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0});
                            $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0});
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*2,top:imgH*0});
                            $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*1});
                            $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*1,top:imgH*1});
        
                            $('#section4 .gallery-list').eq(0).hide().addClass('hide');                    
                            $('#section4 .gallery-list').eq(3).hide().addClass('hide');                    
                            $('#section4 .gallery-list').eq(5).hide().addClass('hide');    
                        break;
                        case 2:
                            $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0});
                            $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*1,top:imgH*0});
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*1});
                            $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*1,top:imgH*1});
                            $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*2});
        
                            $('#section4 .gallery-list').eq(0).hide().addClass('hide');                    
                            $('#section4 .gallery-list').eq(3).hide().addClass('hide');                    
                            $('#section4 .gallery-list').eq(5).hide().addClass('hide');    
                        break;
                        default:
                            $('#section4 .gallery-list').eq(1).show().stop().animate({left:imgW*0,top:imgH*0});
                            $('#section4 .gallery-list').eq(2).show().stop().animate({left:imgW*0,top:imgH*1});
                            $('#section4 .gallery-list').eq(4).show().stop().animate({left:imgW*0,top:imgH*2});
                            $('#section4 .gallery-list').eq(6).show().stop().animate({left:imgW*0,top:imgH*3});
                            $('#section4 .gallery-list').eq(7).show().stop().animate({left:imgW*0,top:imgH*4});
        
                            $('#section4 .gallery-list').eq(0).hide().addClass('hide');                    
                            $('#section4 .gallery-list').eq(3).hide().addClass('hide');                    
                            $('#section4 .gallery-list').eq(5).hide().addClass('hide');    
                    }
                    

                                   
                    
                }
                
                $('#section4 .gallery-list').addClass('zoomIn');


                h=$('#section4 .gallery-list.hide').length;
                rows=Math.ceil((n-h)/cols); 
                $('#section4 .gallery-wrap').stop().animate({height:imgH*rows},300)
            }


        }
        section5(){
            function svgAnimation(){
                const svgObj=$('.ring-front circle');
                let svgArr = [];
                let piece = [];
                let perSize = [];
                let setId=[];
                let sum=[0,0,0,0];
                let per=[.9,.75,.9,.62];
                let sec=2;
            
                $.each(svgObj,function(idx, obj){
                    //console.log(idx, obj, obj.getTotalLength());
                    svgArr[idx]=obj.getTotalLength();


                    obj.style.strokeDasharray = svgArr[idx];
                    obj.style.strokeDashoffset = svgArr[idx];

                    //각 요소의 퍼센트 길이

                    perSize[idx]=svgArr[idx]*per[idx];  

                    //각 요소의 마디 길이

                    piece[idx]=perSize[idx]/sec/100;

                    //마디를 카운터 타이머 이용
                    function sumfn(){
                        sum[idx]+=piece[idx];
                        if(sum[idx]>perSize[idx]){
                            clearInterval(setId[idx]);
                        }else{
                            //애니메이션 구현
                            $(obj).css({strokeDashoffset: svgArr[idx]-sum[idx]});
                            $('#section5 .count-num').eq(idx).html(Math.ceil(sum[idx]/svgArr[idx]*100)+'%');
                        }
                    
                    }
                    
                    
                    //타이머 설정
                setId[idx]= setInterval(sumfn,10);

                });
                }
            
            let t=false;


            const sec5Top=$('#section5').offset().top-$(window).height();
            $(window).scroll(()=>{
                
                if($(window).scrollTop()>sec5Top){
               
                if(t===false){
                    t=true;
                    $('#section5').addClass('sec5Ani');
                    svgAnimation();
                    
                }
               
                

                
            }
            if($(window).scrollTop()===0){
                $('#section5').removeClass('sec5Ani');
               t=false;
            }
            });



        }
        section6(){
            const sec6Top=$('#section6').offset().top-$(window).height();
            $(window).scroll(function(){
                
                if($(window).scrollTop()>sec6Top){
                $('#section6').addClass('sec6Ani');
                return;

                
            }
            if($(window).scrollTop()===0){
                $('#section6').removeClass('sec6Ani');
                return;
            }
            });
        }
        section7(){
            const sec7Top=$('#section7').offset().top-$(window).height();
            $(window).scroll(function(){
                
                if($(window).scrollTop()>sec7Top){
                $('#section7').addClass('sec7Ani');
                return;

                
            }
            if($(window).scrollTop()===0){
                $('#section7').removeClass('sec7Ani');
                return;
            }
            });
        }
        section8(){
            const sec8Top=$('#section8').offset().top-$(window).height();
            $(window).scroll(function(){
                
                if($(window).scrollTop()>sec8Top){
                $('#section8').addClass('sec8Ani');
                return;

                
            }
            if($(window).scrollTop()===0){
                $('#section8').removeClass('sec8Ani');
                return;
            }
            });
        }
        section9(){
            const sec9Top=$('#section9').offset().top-$(window).height();
            $(window).scroll(function(){
                
                if($(window).scrollTop()>sec9Top){
                $('#section9').addClass('sec9ani');
                return;

                
            }
            if($(window).scrollTop()===0){
                $('#section9').removeClass('sec9ani');
                return;
            }
            });
        }

        footer(){

        }
        gotop(){

            $(window).scroll(function(){
                if($(window).scrollTop()>100){
                    $('#gotopBox').stop().fadeIn(1000);
                }else{
                    $('#gotopBox').stop().fadeOut(1000);
                }
            });
            $('.gotop-btn').on({
                click:function(){
                    $('html,body').stop().animate({scrollTop:0},500);
                }
            });
        }
        quick(){
            let quickTop=($(window).height()-$('#quickBox').height())/2

            $(window).scroll(function(){
                $('#quickBox').stop().animate({top:quickTop+$(window).scrollTop()-150},600,'easeInOutExpo');
            });
        }
    }
    const newPofo = new Pofo();

    newPofo.init();







})(jQuery);
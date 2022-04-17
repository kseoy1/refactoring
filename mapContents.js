var quizPopCon;

$(window).on('load', function () {

    $('.contents').eq(0).show();

    // mapCon = new mapContents($('.clickPage1 .map1'), 1244, 805, true);
    // mapCon.init();

    // $('.setContent li').on('click', function () {

    //     var idx = $(this).index();
    //     var page = $('.contents').eq(idx);

    //     if (page.attr('class').indexOf('clickPage1') > -1) {

    //         mapCon = new mapContents($('.clickPage1 .map1'), 1244, 805, true);
    //         mapCon.init();

    //     }
    // });

    var a = new MapContent($('.clickPage1 .map1'),
        //같은 클래스 문법이지만 es6로 작성, 클래스선언(객체로)
        {
            width: 1244,
            height: 805
        });

});

// es6
class MapContent { //static, constructor, 메소드..
    // 정적 변수 선언 
    static article = `
    <div class="mapWrap">
    <div class="mapbtn">
    <div class="btn zoom-in"></div>
    <div class="text"></div>
    <div class="btn zoom-out"></div>
    </div>
    <div class="mapbox">
    <div class="map"></div>
    </div>
    </div>
    `;

    // es6 생성자(가장 초기 실행)
    constructor(wrap, config) {
        /** 
         * wrap -> map 컨텐츠가 될 요소의 wrapper
         * config -> map컨텐츠의 설정값 (width, height)
         */

        // es5와 동일한 방법으로 self 지정
        this.self = this;

        this.wrap = wrap;
        this.config = config;

        this.status = { //핵심기능들을 위한 변수들을 하나의 프로포티(속성)로 묶음
            zoom: 1,
            clickX: 0,
            clickY: 0,
            transX: 0,
            transY: 0,
            moving: false
        }

        // 초기화
        this.init();
    }

    init() { // es6 class를 사용할 경우의 메소드 선언 형태
        this.makeHTML();
        this.bindElement();
        this.bindEventHandler();
        this.setStyle();
        this.setText();
    }

    makeHTML() {
        this.wrap.html(MapContent.article); //static으로 선언하는애는 이런식 
    }

    bindElement() { // 보기편하게 단락을 나눔
        // 요소 바인드 ,할당
        this.mapWrap = this.wrap.find(".mapWrap");
        this.mapBtn = this.wrap.find(".mapbtn");
        this.map = this.wrap.find(".map");
        this.zoomText = this.mapBtn.find(".text");
    }

    bindEventHandler() {
        // 이벤트 바인드
        this.mapBtn.find("*").on("selectstart", this.stopEvent); //박스들 드래그안되게
        this.mapBtn.find(".zoom-in").on("click", () => this.zoomHandler(true)); //클릭햇을때 함수실행
        this.mapBtn.find(".zoom-out").on("click", () => this.zoomHandler(false));
        this.map.on("mousedown mousemove mouseup mouseenter mouseleave", (e) => this.mapHandler(e));
    }

    stopEvent() {
        // 이벤트 멈춤
        return false;
    }

    setStyle() {
        this.mapWrap.css({
            width: this.config.width,
            height: this.config.height
        })
    }

    setText() {
        // 버튼 텍스트, 저장돼있는 현 상태를 기준으로 텍스트를 삽입 기존에는 round로 반올림하였지만
        // toFixed로 고정했기 때문에 더 이상 필요없어져서 삭제
        const percentage = this.status.zoom * 100 + "%";
        this.zoomText.html(percentage);
    }


    // 움직인 만큼 값 계산하는 함수
    mapHandler(event) {
        // 맵 움직임
        switch (event.type) {
            case "mousedown":
                if (this.self.status.zoom > 1) {
                    this.self.status.moving = true;
                    // 마우스 클릭 지점
                    this.self.status.clickX = event.pageX - this.self.status.transX;
                    this.self.status.clickY = event.pageY - this.self.status.transY;
                }
                break;

            case "mousemove":
                if (this.self.status.moving) {
                    // 계산식은 정확히 모르겠음
                    this.self.status.transX = -(this.self.status.clickX - event.pageX);
                    this.self.status.transY = -(this.self.status.clickY - event.pageY);

                    // transition이 0 이어야 해서, setMapTransform에 넣기에는 애매한 부분이 있어서 따로 뺐음
                    this.map.css({
                        'transform': 'scale(' + this.self.status.zoom + ') translate(' + this.self.status.transX + 'px, ' + this.self.status.transY + 'px)',
                        'transition': 'transform 0s'
                    });
                }
                break;

                // case 여러 개 겹치기
            case "mouseup":
            case "mouseenter":
            case "mouseleave":
                this.self.status.moving = false;
                break;

            default:
                break;
        }
    }

    zoomHandler(type) {

        if ((type && this.status.zoom >= 1.8) || (!type && this.status.zoom <= 0.2)) return false;

        // javascript는 컴퓨터 공학적으로 소수점끼리 더 하면 정확하지 않은 숫자가 나옴
        // 정확한 조건으로 구분하기 위해, toFixed로 소수점을 고정

        type ? 
            this.status.zoom = (Number(this.status.zoom) + 0.2).toFixed(1) :
            this.status.zoom = (Number(this.status.zoom) - 0.2).toFixed(1);

        // 1과 같거나 작을 경우 원위치
        this.status.zoom <= 1 ? this.setMapTransform(true) : this.setMapTransform();

        effectAdo("click");
    }

    // 움직인 만큼 css로 움직이는 함수
    setMapTransform(origin) {
        if (origin) {
            // 100% 이하일 경우 원위치로 보내는 단락(그림 가운데로 위치 시킴)
            this.status.transX = 0;
            this.status.transY = 0;
            this.map.css("transform", "scale(" + this.status.zoom + ") translate(0px, 0px)")
            this.map.css("transition", "0.3s");
            this.map.css("cursor", "default");
        } else{
            // 120 ~ 180%일 경우 줌 인, 줌 아웃(그림 확대, 축소)
            this.map.css("transform", "scale(" + this.status.zoom + ") translate(" + this.status.transX + "px, " + this.status.transY + "px)");
            this.map.css("transition", "0.3s");
            this.map.css("cursor", "pointer");
        }

        this.setText();
    }
}


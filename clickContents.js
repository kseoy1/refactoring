clickContents = function (items, wrap) {
	var self = this;
	this.wrap = wrap;
	this.itemwrap = '';
	this.clickItems = items;
	this.openItemNum = 0;
	this.items = '';
	this.ansbtn = '';

	this.init = function () {
		this.openItemNum = 0;

		/*
			#1
			==> javascript에서는 0은 false로 인식하기 때문에 불필요한 비교 연산자(> 0)를 사용하지 않아도 된다
			==> javascript if문에서 false로 처리되는 경우 : 0, "", false 등등
		*/
		if (this.wrap.find('.clickItem').length) {
			this.wrap.find('.clickContent').remove();
		}


		/*
			#2
			대부분의 값 등으로 예외를 만드는 것보다는 확실한 경우를 처리하는 것이 좋다고 생각하고
			* #1와 동일하게, length > 0 등의 연산자보다는 .length로 true, false를 판단하는 것이 좋을 것 같음
			* true : 0이 아닌 수(- 포함), false : 0
			* 결론 : if문 삭제 했던 것을 다시 감싸주되, self.clickItems > 0 대신 self.clickItems로 하기
		*/
		if (self.clickItems) {

			this.makeConElement();

		} else {

			console.error("클릭될 아이템의 개수는 반드시 1개 이상이어야 합니다.");
		}

	}

	/*
		#3
		함수 하나로 묶기
		구조 바꾸다보니 다른 방법 구상해보다니 자바스크립트 사용해봄
	*/
	this.makeConElement = function () {
		// ------------------------------------ makeWrap 역할
		var elemWrapper = document.createElement("div");
		elemWrapper.className = "clickContent";

		// ------------------------------------ makeItems 역할
		for (var i = 0; i < this.clickItems; i++) {
			var elemClickItem = document.createElement("div");
			elemClickItem.className = "clickItem clickItem" + (i + 1);

			// 아이템 클릭시 일어날 함수(#4쪽에 설명 있음)
			elemClickItem.addEventListener("click", this.ClickToggleItems);

			elemWrapper.appendChild(elemClickItem);
		}

		// ------------------------------------ makeBtn 역할
		var elemBtn = document.createElement("div");
		elemBtn.className = "ansbtn";

		// 아이템 클릭시 일어날 함수(#5쪽에 설명 있음)
		elemBtn.addEventListener("click", this.ClickAnswerBtn);
		elemWrapper.appendChild(elemBtn);

		/**
		 * append와 appendChild 차이
		 * append : 문자열로 이룬 HTML를 추가
		 * appendChild : 위와 같이 객체 형태의 HTML을 추가함
		 */
		this.wrap.append(elemWrapper);


		this.itemwrap = this.wrap.find('.clickContent');
		this.items = this.itemwrap.find('.clickItem');
		this.ansbtn = this.itemwrap.find('.ansbtn');
	}

	/*
		#4
		가독성 향상 목적
		이유 :익명 함수(원래 버전처럼 함수에 이름 없는것 (function(){}))를 사용하는 하는 것보다는
		함수에 네이밍을 함으로서 함수의 목적과 행동에 예측 가능토록 한다
		this.makeConElement()에서 클릭시 일어날 함수를 지정해줬음.
	*/

	this.ClickToggleItems = function () {
		if ($(this).css('opacity') == '0') {
			$(this).css('opacity', '1');
			self.openItemNum--;
		} else {
			$(this).css('opacity', '0');
			self.openItemNum++;
		}

		effectAdo('click');
		if (self.openItemNum == self.clickItems) {
			self.ansbtn.addClass('re');
		} else {
			self.ansbtn.removeClass('re');
		}
	}

	/*
		#5
		#4와 같이 익명함수보다는 함수의 이름을 지정함으로써 가독성 향상
		this.makeConElement()에서 클릭시 일어날 함수를 지정해줬음.	
	*/
	this.ClickAnswerBtn = function () {
		effectAdo('click');
		if ($(this).hasClass('re')) {
			self.items.css('opacity', '1');
			self.openItemNum = 0;
			self.ansbtn.removeClass('re');
		} else {
			self.items.css('opacity', '0');
			self.ansbtn.addClass('re');
			self.openItemNum = self.clickItems;
		}
	};

}
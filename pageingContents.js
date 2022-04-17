pageingContents = function (wrap) {
	var self = this;
	this.wrap = wrap;
	this.pageNum = wrap.find('.page').length;
	this.currentPage = 0;
	this.next, this.prev, this.navi, this.dot

	this.init = function () {
		self.wrap.find('.navigation').remove();
		self.currentPage = 0;
		self.wrap.find('.page').hide();
		self.wrap.find('.page').eq(0).show();
		self.makeNavi();
	}

	this.makeNavi = function () {
		var html = '<div class="navigation"></div>';
		self.wrap.append(html);

		// 변경
		// 가독성 향상(어차피 추가하는 것은 똑같음)
		var naviElement = "";
		naviElement += '<div class="prev dis"></div>';
		naviElement += '<div class="next"></div>'
		naviElement += '<div class="pageing"></div>';
		self.navi = self.wrap.find(".navigation");
		self.navi.append(naviElement);

		// 변경
		// 가독성 향상(재사용성이 없는 변수 제거)
		for (var i = 0; i < self.pageNum; i++) {
			self.navi.find('.pageing').append("<div class='dot'></div>");
		}

		self.navi.find('.pageing .dot').eq(0).addClass('on');
		self.navi.find('.pageing').css('width', (50 * self.pageNum) + 30 + 'px');
		self.navi.find('.pageing').css('left', 960 - (((50 * self.pageNum) + 30) / 2) + 'px');

		// 변경
		// 가독성 향상, class 생성자 한 곳에 모아서 선언
		self.navi = self.wrap.find('.navigation');
		self.next = self.navi.find('.next');
		self.prev = self.navi.find('.prev');
		self.dot = self.navi.find('.pageing .dot');

		// 변경
		// 요소를 만들 때 이벤트도 함께 지정(문맥에 맞게)
		// 이벤트 선언(init의 익명함수 삭제 및 클릭시 실행될 함수를 표기/명시)
		self.navi.find('.next').on("click", this.nextClick);
		self.navi.find('.prev').on("click", this.prevClick);
		self.navi.find('.pageing .dot').on("click", this.dotClick); // 변경2
	}

	this.nextClick = function () {
		// 변경
		// 가독성 향상, 불필요한 인자와 불필요한 if문 처리 삭제
		// 가독성이 좋은 연산자로 변경
		if (!$(this).hasClass('dis')) {
			self.currentPage++;
			// 사용하지 않는 인자 삭제
			self.pageMove(self.currentPage);
		};
	}

	this.prevClick = function () {
		// 변경
		// 가독성 향상, 불필요한 인자와 불필요한 if문 처리 삭제
		// 가독성이 좋은 연산자로 변경
		if (!$(this).hasClass('dis')) {
			self.currentPage--;
			// 사용하지 않는 인자 삭제
			self.pageMove(self.currentPage);
		};
	}

	// 변경2
	this.dotClick = function () { 
		if ($(this).hasClass('on')) return false;
		var p = $(this).index();
		console.log(p)
		self.currentPage = p;
		self.pageMove(self.currentPage);
	}

	// 변경
	// page라는 사용하지 않는 인자 삭제
	this.pageMove = function (page) {
		console.log(self.currentPage, 2)
		self.wrap.find('.page').hide();
		self.wrap.find('.page').eq(page).show();
		self.navi.find('.pageing .dot').removeClass('on');
		self.navi.find('.pageing .dot').eq(page).addClass('on');

		// 변경
		// 가독성 향상
		$('.dis').removeClass('dis');

		self.currentPage == 0 ?
			// 첫번째 페이지라면 prev에 addClass 그렇지 않으면 ""
			self.prev.addClass('dis') : "";

		self.currentPage + 1 == self.pageNum ?
			// 마지막 페이지라면 next에 addClass 그렇지 않으면 ""
			self.next.addClass('dis') : "";

		effectAdo('click');
	};
}
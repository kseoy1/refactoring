dragContents = function (wrap, set) {
	var self = this;
	this.wrap = wrap;
	this.dragItems = set;
	// this.dragArea, this.dropArea, this.txtArea, this.dragItem, this.dropItem, this.ans;
	
	this.dragArea = self.wrap.find(".dragArea");
	this.dropArea = self.wrap.find(".dropArea");
	this.ansBtn = self.wrap.find('.rebtn');
	
	this.dragItem, this.dropItem;

	this.dragObj = set.drag;
	this.dropObj = set.drop;

	this.init = function () {

		// if (self.wrap.hasClass('dragContents')) {
		// 	self.wrap.removeClass('dragContents');
		// 	self.wrap.find('.dragArea').remove();
		// 	self.wrap.find('.dropArea').remove();
		// 	self.wrap.find('.ansbtn').remove();
		// }

		if (self.wrap.hasClass('dragPage')) {
			/*
			 * 새로 초기화 하는 함수 1줄로 요약
			 * dragContents 클래스를 초기화/확인 용도로만 사용되어서 삭제함.
			 */
			this.dragArea.empty();
			this.dropArea.empty();
		}
		
		self.makeItem();
		self.addDrag();
		self.addDrop();

		$('.rebtn').on('click', function () {
			effectAdo('click');
			self.init();
		});
	}

	// this.makeArea = function(){
	// 	var html = ''+
	// 	'<div class="dropArea">' +
    //         '<div class="conObj"></div>' +
    //         '<div class="txtArea"></div>' +
    //         '<div class="dropObj"></div>' +
    //     '</div>' +
    //     '<div class="dragArea"></div>';

    //     self.wrap.addClass('dragContents');
    //     self.wrap.append(html);
    //     self.dragArea = self.wrap.find('.dragArea');
    //     self.dropArea = self.wrap.find('.dropObj');
    //     self.txtArea = self.wrap.find('.txtArea');
	// }

	// this.makeObj = function(){
	// 	for(var a = 0; a < self.dragObj.length; a++){
    //         var dragDiv = '<div class="dragItem">' + self.dragObj[a] + '</div>'
    //         self.dragArea.append(dragDiv);
    //     }

    //     for(var b = 0; b < self.dropObj.length; b++){
    //         var dropDiv = '<div class="dropCode"></div>'
    //         self.dropArea.append(dropDiv);
    //     }
	// }

	this.makeItem = function(){
		for (var a = 0; a < self.dragObj.length; a++) {
			var dragDiv = '<div class="dragItem">' + self.dragObj[a] + '</div>'
			self.dragArea.append(dragDiv);
		}

		for (var b = 0; b < self.dropObj.length; b++) {
			var dropDiv = '<div class="dropCode"></div>'
			self.dropArea.append(dropDiv);
		}
	}

	this.addDrag = function () {
		self.dragItem = self.dragArea.find('.dragItem');

		self.dragItem.draggable({
			cursor: 'pointer',
			revert: 'invalid',
			helper: 'clone',

			start: function (e, obj) {
				var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
				obj.helper.css({
					'background-color': $(this).css('background-color'),
					'border': '0'
				});
				obj.position.top = Math.round(obj.position.top / factor);
				obj.position.left = Math.round(obj.position.left / factor);
				isRec = $(this);
				
			},

			drag: function (e, obj) {
				var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
				obj.position.top = Math.round(obj.position.top / factor);
				obj.position.left = Math.round(obj.position.left / factor);

			},

			stop: function (e, obj) {
				
			}

		});
	}

	this.addDrop = function () {
		self.dropItem = self.dropArea.find('.dropCode');

		self.dropItem.droppable({
			accept: self.dragItem,

			over: function (e, obj) {
				
			},

			drop: function (e, obj) {
				var factor = FORTEACHERCD.responsive.baseContainerSize.zoom;
				obj.position.top = Math.round(obj.position.top / factor);
				obj.position.left = Math.round(obj.position.left / factor);
				var $this = $(this);
				var drag_ans = isRec.html();
				var drop_ans = self.dropObj[$this.index()];

				if (drop_ans.indexOf(drag_ans) > -1) {
					$this.html(drag_ans);
					$this.addClass('ans');

					// 지우기
					// isRec.css('visibility', 'visible');

					if (self.dropItem.length == self.dropArea.find('.ans').length) {
						// 전체 정답
					}

					isRec.draggable({
						revert: false
					});

					effectAdo('anschk_o');
				} else {
					isRec.draggable({
						revert: true
					})
					effectAdo('anschk_x')
				}
			}
		});
	}
}
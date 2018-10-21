var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MyTimer = (function (_super) {
    __extends(MyTimer, _super);
    function MyTimer() {
        var _this = _super.call(this) || this;
        _this.n = 6;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    MyTimer.prototype.onAddToStage = function (event) {
        this.spr = new egret.Sprite();
        this.addChild(this.spr);
        this.spr.width = 480;
        this.spr.height = 800;
        this.drawTxt();
        this.drawContent();
        this.onButtonComp();
        this.timer = new egret.Timer(1000, 8);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
    };
    MyTimer.prototype.drawTxt = function () {
        this.num = new egret.TextField();
        this.num.text = this.n.toString();
        this.num.size = 100;
        this.num.width = 480;
        this.num.textColor = 0x00ff00;
        this.num.textAlign = egret.HorizontalAlign.CENTER;
        this.spr.addChild(this.num);
    };
    MyTimer.prototype.drawContent = function () {
        this.con = new egret.TextField();
        this.con.text = "默默倒数6秒，迅速点击文字";
        this.con.textColor = 0x00ff00;
        this.con.width = 480;
        this.con.textAlign = egret.HorizontalAlign.CENTER;
        this.con.y = 120;
        this.spr.addChild(this.con);
    };
    MyTimer.prototype.onButtonComp = function () {
        this.img = new egret.Bitmap();
        this.img.texture = RES.getRes("mybtn_png");
        var rect = new egret.Rectangle(10, 10, 15, 15);
        this.img.scale9Grid = rect;
        this.img.y = 200;
        this.img.x = 150;
        this.img.width *= 5;
        this.img.height = 70;
        this.spr.addChild(this.img);
        this.img.touchEnabled = true;
        this.img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    MyTimer.prototype.onTouch = function (evt) {
        this.date = new Date();
        this.startTime = this.date.getTime();
        this.img.alpha = 0;
        this.timer.start();
        this.drawTxt();
        this.spr.touchEnabled = true;
        this.spr.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSRP, this, true);
    };
    MyTimer.prototype.timerFunc = function () {
        if (this.n <= 3) {
            this.num.text = "?";
        }
        else {
            this.spr.removeChildren();
            this.drawTxt();
        }
        this.n--;
    };
    MyTimer.prototype.timerComFunc = function () {
        if (this.n <= -2) {
            this.drawContent();
            this.con.text = "别模糊了醒醒";
            this.spr.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSRP, this, true);
        }
    };
    MyTimer.prototype.onTouchSRP = function (evt) {
        this.date = new Date();
        this.stopTime = this.date.getTime();
        this.finalTime = this.startTime - this.stopTime;
        this.num.text = (this.finalTime / 1000 + 6).toFixed(3);
        this.timer.stop();
        this.drawContent();
        this.spr.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchSRP, this, true);
        switch (Math.floor(Math.abs(this.finalTime / 1000 + 6))) {
            case 0:
                this.con.text = "帅气的专注";
                break;
            case 1:
                this.con.text = "很专注，还需继续努力";
                break;
            case 2:
                this.con.text = "别模糊了醒醒";
                break;
        }
    };
    return MyTimer;
}(egret.DisplayObjectContainer));
__reflect(MyTimer.prototype, "MyTimer");
//# sourceMappingURL=MyTimer.js.map
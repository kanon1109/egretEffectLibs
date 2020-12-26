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
var TrackUnit = cn.geckos.effect.TrackUnit;
var TrackUnitTest = (function (_super) {
    __extends(TrackUnitTest, _super);
    function TrackUnitTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.loop, _this);
        _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.touchMoveHandle, _this);
        _this.tx = 200;
        _this.ty = 500;
        _this.ta = new TrackUnit();
        _this.ta.x = 100;
        _this.ta.x = 100;
        _this.ta.vx = 10;
        _this.ta.vy = 10;
        var spt = new egret.Sprite();
        spt.graphics.lineStyle(5, 0xff0000);
        spt.graphics.drawCircle(0, 0, 10);
        _this.addChild(spt);
        _this.ta.img = spt;
        _this.ta.img.x = 0;
        _this.ta.img.y = 0;
        spt = new egret.Sprite();
        spt.graphics.lineStyle(5, 0x00ff00);
        spt.graphics.drawCircle(0, 0, 10);
        _this.addChild(spt);
        spt.x = _this.tx;
        spt.y = _this.ty;
        return _this;
    }
    TrackUnitTest.prototype.touchMoveHandle = function (e) {
        this.tx = e.stageX;
        this.ty = e.stageY;
    };
    TrackUnitTest.prototype.loop = function () {
        this.ta.update(this.tx, this.ty);
    };
    return TrackUnitTest;
}(egret.Sprite));
__reflect(TrackUnitTest.prototype, "TrackUnitTest");
//# sourceMappingURL=TrackUnitTest.js.map
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
/**
 * Created by kanon on 2015/7/11.
 */
var WingmanMotionEffect = cn.geckos.effect.WingmanMotionEffect;
var WingmanMotionEffectTest = (function (_super) {
    __extends(WingmanMotionEffectTest, _super);
    function WingmanMotionEffectTest() {
        var _this = _super.call(this) || this;
        _this.mouseX = 0;
        _this.mouseY = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    WingmanMotionEffectTest.prototype.onAddToStage = function (event) {
        this.mc = new egret.Shape();
        this.mc.graphics.beginFill(0xff00ff, 1);
        this.mc.graphics.drawRect(0, 0, 50, 50);
        this.mc.graphics.endFill();
        this.mc.anchorOffsetX = .5 * 50;
        this.mc.anchorOffsetY = .5 * 50;
        this.mc.x = 200;
        this.mc.y = 200;
        this.addChild(this.mc);
        this.wme = new WingmanMotionEffect(this.mc);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
    };
    WingmanMotionEffectTest.prototype.loop = function (event) {
        this.wme.follow(this.mouseX, this.mouseY);
    };
    WingmanMotionEffectTest.prototype.touchHandler = function (event) {
        this.mouseX = event.stageX;
        this.mouseY = event.stageY;
    };
    WingmanMotionEffectTest.prototype.touchBeginHandler = function (event) {
        this.mouseX = event.stageX;
        this.mouseY = event.stageY;
    };
    return WingmanMotionEffectTest;
}(egret.Sprite));
__reflect(WingmanMotionEffectTest.prototype, "WingmanMotionEffectTest");
//# sourceMappingURL=WingmanMotionEffectTest.js.map
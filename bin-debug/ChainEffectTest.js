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
 * Created by tangben on 2015/7/9.
 */
var ChainEffect = cn.geckos.effect.ChainEffect;
var ChainEffectTest = (function (_super) {
    __extends(ChainEffectTest, _super);
    function ChainEffectTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    ChainEffectTest.prototype.onAddToStage = function (event) {
        this.chainEffect = new ChainEffect(this);
        this.chainEffect.move(0, 0);
        this.chainEffect.lineColor = 0xFFFFFF;
        this.chainEffect.lineSize = 10;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
        this.stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
    };
    ChainEffectTest.prototype.touchBeginHandler = function (event) {
        this.mouseX = event.localX;
        this.mouseY = event.localY;
        this.chainEffect.move(this.mouseX, this.mouseY);
    };
    ChainEffectTest.prototype.touchHandler = function (event) {
        this.mouseX = event.localX;
        this.mouseY = event.localY;
    };
    ChainEffectTest.prototype.enterFrameHandler = function (event) {
        this.chainEffect.update(this.mouseX, this.mouseY);
    };
    return ChainEffectTest;
}(egret.Sprite));
__reflect(ChainEffectTest.prototype, "ChainEffectTest");
//# sourceMappingURL=ChainEffectTest.js.map
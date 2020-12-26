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
 * Created by tangben on 2015/7/10.
 */
var OilPaintingEffect = cn.geckos.effect.OilPaintingEffect;
var OilPaintingEffectTest = (function (_super) {
    __extends(OilPaintingEffectTest, _super);
    function OilPaintingEffectTest() {
        var _this = _super.call(this) || this;
        _this.oilPaintingEffect = new OilPaintingEffect(_this.graphics, 0);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    OilPaintingEffectTest.prototype.onAddToStage = function (event) {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDownHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMoveHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUpHandler, this);
    };
    OilPaintingEffectTest.prototype.mouseUpHandler = function (event) {
        this.isDown = false;
    };
    OilPaintingEffectTest.prototype.mouseMoveHandler = function (event) {
        if (this.isDown)
            this.oilPaintingEffect.paintMove(event.stageX, event.stageY);
    };
    OilPaintingEffectTest.prototype.mouseDownHandler = function (event) {
        this.isDown = true;
        this.oilPaintingEffect.color = Math.random() * 0xFFFFFF;
        this.oilPaintingEffect.clear();
    };
    return OilPaintingEffectTest;
}(egret.Sprite));
__reflect(OilPaintingEffectTest.prototype, "OilPaintingEffectTest");
//# sourceMappingURL=OilPaintingEffectTest.js.map
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
 * Created by tangben on 2015/7/24.
 */
var ResidueShadowEffect = effect.ResidueShadowEffect;
var ResidueShadowEffectTest = (function (_super) {
    __extends(ResidueShadowEffectTest, _super);
    function ResidueShadowEffectTest() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        var texture = RES.getRes("mc");
        _this.mc = new egret.Bitmap(texture);
        _this.addChild(_this.mc);
        _this.mc2 = new egret.Bitmap(texture);
        _this.addChild(_this.mc2);
        texture = RES.getRes("m1");
        var json = RES.getRes("m1Json");
        var mcdf = new egret.MovieClipDataFactory(json, texture);
        _this.batMc = new egret.MovieClip(mcdf.generateMovieClipData());
        _this.addChild(_this.batMc);
        _this.batMc.rotation = 40;
        _this.batMc.anchorOffsetX = .5 * _this.batMc.width;
        _this.batMc.anchorOffsetY = .5 * _this.batMc.width;
        _this.batMc.play(-1);
        _this.residueShadowEffect = new ResidueShadowEffect(_this);
        _this.residueShadowEffect.addGoods(_this.mc);
        //this.residueShadowEffect.addGoods(this.mc2);
        _this.residueShadowEffect.addGoods(_this.batMc);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.loop, _this);
        return _this;
    }
    ResidueShadowEffectTest.prototype.loop = function (event) {
        this.mc.x += 2;
        this.mc.y += 2;
        this.residueShadowEffect.renderer();
    };
    ResidueShadowEffectTest.prototype.onAddToStage = function (event) {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDownHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMoveHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUpHandler, this);
    };
    ResidueShadowEffectTest.prototype.mouseUpHandler = function (event) {
        this.isDown = false;
    };
    ResidueShadowEffectTest.prototype.mouseMoveHandler = function (event) {
        if (this.isDown) {
            this.batMc.x = event.stageX;
            this.batMc.y = event.stageY;
        }
    };
    ResidueShadowEffectTest.prototype.mouseDownHandler = function (event) {
        this.isDown = true;
        //this.residueShadowEffect.removeGoods(this.batMc);
    };
    return ResidueShadowEffectTest;
}(egret.Sprite));
__reflect(ResidueShadowEffectTest.prototype, "ResidueShadowEffectTest");
//# sourceMappingURL=ResidueShadowEffectTest.js.map
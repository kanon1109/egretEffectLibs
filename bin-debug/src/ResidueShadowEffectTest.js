/**
 * Created by tangben on 2015/7/24.
 */
var ResidueShadowEffect = cn.geckos.effect.ResidueShadowEffect;
var ResidueShadowEffectTest = (function (_super) {
    __extends(ResidueShadowEffectTest, _super);
    function ResidueShadowEffectTest() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        var texture = RES.getRes("mc");
        this.mc = new egret.Bitmap(texture);
        this.addChild(this.mc);
        this.mc2 = new egret.Bitmap(texture);
        this.addChild(this.mc2);
        texture = RES.getRes("m1");
        var json = RES.getRes("m1Json");
        var mcdf = new egret.MovieClipDataFactory(json, texture);
        this.batMc = new egret.MovieClip(mcdf.generateMovieClipData());
        this.addChild(this.batMc);
        this.batMc.rotation = 40;
        this.batMc.anchorX = .5;
        this.batMc.anchorY = .5;
        this.batMc.play(-1);
        this.residueShadowEffect = new ResidueShadowEffect(this);
        //this.residueShadowEffect.addGoods(this.mc);
        //this.residueShadowEffect.addGoods(this.mc2);
        this.residueShadowEffect.addGoods(this.batMc);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
    }
    var __egretProto__ = ResidueShadowEffectTest.prototype;
    __egretProto__.loop = function (event) {
        //this.batMc.x += 2;
        //this.batMc.y += 2;
        this.residueShadowEffect.renderer();
    };
    __egretProto__.onAddToStage = function (event) {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDownHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMoveHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUpHandler, this);
    };
    __egretProto__.mouseUpHandler = function (event) {
        this.isDown = false;
    };
    __egretProto__.mouseMoveHandler = function (event) {
        if (this.isDown) {
            this.batMc.x = event.stageX;
            this.batMc.y = event.stageY;
        }
    };
    __egretProto__.mouseDownHandler = function (event) {
        this.isDown = true;
        //this.residueShadowEffect.removeGoods(this.batMc);
    };
    return ResidueShadowEffectTest;
})(egret.Sprite);
ResidueShadowEffectTest.prototype.__class__ = "ResidueShadowEffectTest";
//# sourceMappingURL=ResidueShadowEffectTest.js.map
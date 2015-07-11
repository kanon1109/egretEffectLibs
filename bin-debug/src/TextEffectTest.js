/**
 * Created by kanon on 2015/7/11.
 */
var TextEffect = cn.geckos.effect.TextEffect;
var TextEffectTest = (function (_super) {
    __extends(TextEffectTest, _super);
    function TextEffectTest() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = TextEffectTest.prototype;
    __egretProto__.onAddToStage = function (event) {
        this.text = new egret.TextField();
        this.text.multiline = true;
        this.text.x = 10;
        this.text.y = 200;
        this.text.width = 450;
        this.text.height = 500;
        this.addChild(this.text);
        this.textEffect = new TextEffect();
        this.textEffect.progressShow(this.text, "asdasdasdqe12sdqwasd啊吴涤清我的阿斯达阿斯顿请问阿斯达", 10);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.stageClickHandler, this);
    };
    __egretProto__.stageClickHandler = function (event) {
        this.textEffect.destroy();
    };
    return TextEffectTest;
})(egret.Sprite);
TextEffectTest.prototype.__class__ = "TextEffectTest";

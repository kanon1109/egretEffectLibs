/**
 * Created by tangben on 2015/7/10.
 */
var BlackHoleEffect = cn.geckos.effect.BlackHoleEffect;
var BlackHoleEvent = cn.geckos.effect.BlackHoleEvent;
var BlackHoleEffectTest = (function (_super) {
    __extends(BlackHoleEffectTest, _super);
    function BlackHoleEffectTest() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = BlackHoleEffectTest.prototype;
    __egretProto__.onAddToStage = function (event) {
        this.ary = [];
        this.holeList = [];
        this.holeSpt = new egret.Sprite();
        this.addChild(this.holeSpt);
        this.mcSpt = new egret.Sprite();
        this.addChild(this.mcSpt);
        this.btn = new egret.Shape();
        this.btn.graphics.beginFill(0xff00ff, 1);
        this.btn.graphics.drawRect(0, 0, 200, 100);
        this.btn.graphics.endFill();
        this.addChild(this.btn);
        this.btn.touchEnabled = true;
        this.texture = RES.getRes("blackHole");
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseClickHandler, this);
        this.btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btnClickHandler, this);
        this.addObj();
    };
    __egretProto__.btnClickHandler = function (event) {
        event.stopPropagation();
        this.addObj();
    };
    __egretProto__.loop = function (event) {
        var length = this.holeList.length;
        for (var i = length - 1; i >= 0; i--) {
            var blackHole = this.holeList[i];
            blackHole.update();
        }
    };
    __egretProto__.mouseClickHandler = function (event) {
        var blackHole = new BlackHoleEffect();
        blackHole.addEventListener(BlackHoleEvent.IN_HOLE, this.inHoleHandler, this);
        blackHole.addEventListener(BlackHoleEvent.OVER, this.blackHoleOverHandler, this);
        blackHole.addEventListener(BlackHoleEvent.ATTENUATION, this.attenuationHandler, this);
        blackHole.addSubstanceList(this.ary);
        blackHole.addHole(event.stageX, event.stageY);
        this.holeList.push(blackHole);
        var bhMc = new egret.Bitmap(this.texture);
        bhMc.anchorX = .5;
        bhMc.anchorY = .5;
        bhMc.x = event.stageX;
        bhMc.y = event.stageY;
        bhMc.scaleX = 0;
        bhMc.scaleY = 0;
        this.holeSpt.addChild(bhMc);
        blackHole.useData = bhMc;
        egret.Tween.get(bhMc).to({ scaleX: 1, scaleY: 1 }, 700);
        egret.Tween.get(bhMc).to({ rotation: 1440, repeat: -1 }, 3000);
    };
    __egretProto__.attenuationHandler = function (event) {
        //这里可以将黑洞的显示效果慢慢缩小。
        var blackHole = event.currentTarget;
        var bhMc = blackHole.useData;
        egret.Tween.get(bhMc).to({ scaleX: 0, scaleY: 0 }, 1000);
    };
    __egretProto__.blackHoleOverHandler = function (event) {
        //黑洞完全消失，可以将黑洞显示对象删除
        var blackHole = event.currentTarget;
        blackHole.destroy();
        var length = this.holeList.length;
        for (var i = length - 1; i >= 0; i--) {
            var bh = this.holeList[i];
            if (bh == blackHole) {
                this.holeList.splice(i, 1);
                var bhMc = bh.useData;
                bh.useData = null;
                if (bhMc && bhMc.parent)
                    bhMc.parent.removeChild(bhMc);
                break;
            }
        }
    };
    __egretProto__.inHoleHandler = function (event) {
        var dObj = event.dObj;
        var length = this.ary.length;
        for (var i = 0; i < length; i++) {
            var sp = this.ary[i];
            if (dObj == sp) {
                this.ary.splice(i, 1);
                break;
            }
        }
        if (dObj.parent)
            dObj.parent.removeChild(dObj);
    };
    __egretProto__.addObj = function () {
        var num = this.randnum(10, 20);
        var texture = RES.getRes("bee");
        for (var i = 1; i <= num; i++) {
            var index = this.randnum(1, 4);
            var sp = new egret.Bitmap(texture);
            sp.x = this.randnum(0, this.stage.stageWidth);
            sp.y = this.randnum(0, this.stage.stageHeight);
            this.ary.push(sp);
            this.mcSpt.addChild(sp);
        }
    };
    __egretProto__.randnum = function (a, b) {
        return Math.random() * (b - a) + a;
    };
    return BlackHoleEffectTest;
})(egret.Sprite);
BlackHoleEffectTest.prototype.__class__ = "BlackHoleEffectTest";
//# sourceMappingURL=BlackHoleEffectTest.js.map
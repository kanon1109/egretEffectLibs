/**
 * Created by tangben on 2015/7/10.
 */
import BlackHoleEffect = cn.geckos.effect.BlackHoleEffect;
import BlackHoleEvent = cn.geckos.effect.BlackHoleEvent;
class BlackHoleEffectTest extends egret.Sprite
{
    private blackHole:BlackHoleEffect;
    private ary:any[];
    private holeList:BlackHoleEffect[];
    private holeSpt:egret.Sprite;
    private btnSpt:egret.Sprite;
    private mcSpt:egret.Sprite;
    private btn:egret.Shape;
    private texture:egret.Texture;
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }


    private onAddToStage(event:egret.Event):void
    {
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
    }


    private btnClickHandler(event:egret.TouchEvent):void
    {
        event.stopPropagation();
        this.addObj();
    }

    private loop(event:egret.Event):void
    {
        var length:number = this.holeList.length;
        for (var i:number = length - 1; i >= 0; i--)
        {
            var blackHole:BlackHoleEffect = this.holeList[i];
            blackHole.update();
        }
    }

    private mouseClickHandler(event:egret.TouchEvent):void
    {
        var blackHole:BlackHoleEffect = new BlackHoleEffect();
        blackHole.addEventListener(BlackHoleEvent.IN_HOLE, this.inHoleHandler, this);
        blackHole.addEventListener(BlackHoleEvent.OVER, this.blackHoleOverHandler, this);
        blackHole.addEventListener(BlackHoleEvent.ATTENUATION, this.attenuationHandler, this);
        blackHole.addSubstanceList(this.ary);
        blackHole.addHole(event.stageX, event.stageY);
        this.holeList.push(blackHole);

        var bhMc:egret.Bitmap = new egret.Bitmap(this.texture);
        bhMc.anchorX = .5;
        bhMc.anchorY = .5;
        bhMc.x = event.stageX;
        bhMc.y = event.stageY;
        bhMc.scaleX = 0;
        bhMc.scaleY = 0;
        this.holeSpt.addChild(bhMc);
        blackHole.useData = bhMc;
        egret.Tween.get(bhMc).to({ scaleX:1, scaleY:1 }, 700 );
        egret.Tween.get(bhMc).to({ rotation:1440, repeat: -1 }, 3000 );
    }


    private attenuationHandler(event:BlackHoleEvent):void
    {
        //这里可以将黑洞的显示效果慢慢缩小。
        var blackHole:BlackHoleEffect = event.currentTarget;
        var bhMc:egret.Bitmap = <egret.Bitmap>blackHole.useData;
        egret.Tween.get(bhMc).to({ scaleX:0, scaleY:0 }, 1000 );
    }


    private blackHoleOverHandler(event:BlackHoleEvent):void
    {
        //黑洞完全消失，可以将黑洞显示对象删除
        var blackHole:BlackHoleEffect = event.currentTarget;
        blackHole.destroy();
        var length:number = this.holeList.length;
        for (var i:number = length - 1; i >= 0; i--)
        {
            var bh:BlackHoleEffect = this.holeList[i];
            if (bh == blackHole)
            {
                this.holeList.splice(i, 1);
                var bhMc:egret.Bitmap = <egret.Bitmap>bh.useData;
                bh.useData = null;
                if (bhMc && bhMc.parent)
                    bhMc.parent.removeChild(bhMc);
                break;
            }
        }
    }


    private inHoleHandler(event:BlackHoleEvent):void
    {
        var dObj:egret.DisplayObject = event.dObj;
        var length:number = this.ary.length;
        for (var i:number = 0; i < length; i++)
        {
            var sp:egret.Sprite = this.ary[i];
            if (dObj == sp)
            {
                this.ary.splice(i, 1);
                break;
            }
        }
        if (dObj.parent) dObj.parent.removeChild(dObj);
    }


    private addObj():void
    {
        var num:number = this.randnum(10, 20);
        var texture:egret.Texture = RES.getRes("bee");
        for (var i:number = 1; i <= num; i++)
        {
            var index:number = this.randnum(1, 4);
            var sp:egret.Bitmap = new egret.Bitmap(texture);
            sp.x = this.randnum(0, this.stage.stageWidth);
            sp.y = this.randnum(0, this.stage.stageHeight);
            this.ary.push(sp);
            this.mcSpt.addChild(sp);
        }
    }

    public randnum(a:number, b:number):number
    {
        return Math.random() * (b - a) + a;
    }
}
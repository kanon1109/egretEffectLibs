/**
 * Created by kanon on 2015/7/11.
 */
import WingmanMotionEffect = cn.geckos.effect.WingmanMotionEffect;
class WingmanMotionEffectTest extends egret.Sprite
{
    private mouseX:number = 0;
    private mouseY:number = 0;
    private mc:egret.Shape;
    private wme:WingmanMotionEffect;
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event):void
    {
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
    }

    private loop(event:egret.Event):void
    {
        this.wme.follow(this.mouseX, this.mouseY);
    }

    private touchHandler(event:egret.TouchEvent):void
    {
        this.mouseX = event.stageX;
        this.mouseY = event.stageY;
    }
    
    private touchBeginHandler(event:egret.TouchEvent):void
    {
        this.mouseX = event.stageX;
        this.mouseY = event.stageY;
    }
}
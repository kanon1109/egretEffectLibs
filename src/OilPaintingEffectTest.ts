/**
 * Created by tangben on 2015/7/10.
 */
import OilPaintingEffect = effect.OilPaintingEffect;
class OilPaintingEffectTest extends egret.Sprite
{
    private oilPaintingEffect:OilPaintingEffect;
    private isDown:boolean;
    public constructor()
    {
        super();
        this.oilPaintingEffect = new OilPaintingEffect(this.graphics, 0);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);        
    }
    
    private onAddToStage(event:egret.Event):void
    {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDownHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMoveHandler, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUpHandler, this);
    }

    private mouseUpHandler(event:egret.TouchEvent):void
    {
        this.isDown = false;
    }

    private mouseMoveHandler(event:egret.TouchEvent):void
    {
        if (this.isDown)
            this.oilPaintingEffect.paintMove(event.stageX, event.stageY);
    }

    private mouseDownHandler(event:egret.TouchEvent):void
    {
        this.isDown = true;
        this.oilPaintingEffect.color = Math.random() * 0xFFFFFF;
        this.oilPaintingEffect.clear();
    }
}
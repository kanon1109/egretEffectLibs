/**
 *
 * @author 
 *
 */
import SlotsEffect = cn.geckos.effect.SlotsEffect;
class SlotsTest extends egret.Sprite
{
	private slotsEffect:SlotsEffect;
	public constructor()
	{
		super();
        this.slotsEffect = new SlotsEffect(1, 15, 2, 50);
        this.slotsEffect.push(this.selectMc, this);

		var btn1:egret.Shape = new egret.Shape();
		btn1.graphics.beginFill(0xff00ff, 1);
		btn1.graphics.drawRect(0, 0, 50, 50);
		btn1.graphics.endFill();
		btn1.anchorX = .5;
		btn1.anchorY = .5;
		btn1.x = 200;
		btn1.y = 200;
        btn1.touchEnabled = true;
		this.addChild(btn1);

		var btn2:egret.Shape = new egret.Shape();
		btn2.graphics.beginFill(0xff00ff, 1);
		btn2.graphics.drawRect(0, 0, 50, 50);
		btn2.graphics.endFill();
		btn2.anchorX = .5;
		btn2.anchorY = .5;
		btn2.x = 300;
		btn2.y = 200;
        btn2.touchEnabled = true;
		this.addChild(btn2);
		
		
        var btn3:egret.Shape = new egret.Shape();
        btn3.graphics.beginFill(0xff00ff, 1);
        btn3.graphics.drawRect(0, 0, 50, 50);
        btn3.graphics.endFill();
        btn3.anchorX = .5;
        btn3.anchorY = .5;
        btn3.x = 400;
        btn3.y = 200;
        btn3.touchEnabled = true;
        this.addChild(btn3);

        btn1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btn1ClickHandler, this);
        btn2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btn2ClickHandler, this);
		btn3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.btn3ClickHandler, this);

        
        var startX:number = 100;
        var startY:number = 300;
		var gapH:number = 10;
		var gapV:number = 10;
		var r:number = 1;
		var c:number = 1;
        for(var i:number = 0; i < 15; i++)
		{
			var mc:egret.Shape = new egret.Shape();
			mc.graphics.beginFill(0x00ffff, 1);
			mc.graphics.drawRect(0, 0, 50, 50);
			mc.graphics.endFill();
			mc.anchorX = .5;
			mc.anchorY = .5;
			mc.x = startX + (r - 1) * (50 + gapH);
			mc.y = startY + (c - 1) * (50 + gapV);
			mc.name = "mc" + (i + 1);
			this.addChild(mc);
			r++;
			if(r > 5)
			{
				r = 1;
				c++;
			}
		}
		
        this.stopAllMc();
        this.selectMc();
	}
	
	
    private btn2ClickHandler(event:egret.TouchEvent):void
    {
        this.slotsEffect.splice(this.randomSelect);
        this.slotsEffect.push(this.selectMc, this);
        this.slotsEffect.show(Math.floor(Math.random() * 15 + 1));
    }
            	
    private btn1ClickHandler(event:egret.TouchEvent):void
    {
        this.slotsEffect.splice(this.selectMc);
        this.slotsEffect.push(this.randomSelect, this);
        this.slotsEffect.show(Math.floor(Math.random() * 15 + 1));
    }

	private btn3ClickHandler(event:egret.TouchEvent):void
	{
		this.slotsEffect.destroy();
	}

    /**
    * 选中某个mc
    * @param	mc
    */
    private selectMc():void
    {
        this.stopAllMc();
        console.log("this.slotsEffect.curIndex " + this.slotsEffect.curIndex);
        var mc:egret.Shape = <egret.Shape>this.getChildByName("mc" + this.slotsEffect.curIndex);
		mc.graphics.clear();
		mc.graphics.beginFill(0xffff00, 1);
		mc.graphics.drawRect(0, 0, 50, 50);
		mc.graphics.endFill();
    }
    	
    private randomSelect():void
    {
        this.stopAllMc();
        console.log("randomSelect this.slotsEffect.randomIndex " + this.slotsEffect.randomIndex);
		var mc:egret.Shape = <egret.Shape>this.getChildByName("mc" + this.slotsEffect.randomIndex);
		mc.graphics.clear();
		mc.graphics.beginFill(0xffff00, 1);
		mc.graphics.drawRect(0, 0, 50, 50);
		mc.graphics.endFill();
    }
    	
    private stopAllMc():void
    {
        for (var i:number = 1; this.getChildByName("mc" + i); i++)
        {
            var mc:egret.Shape = <egret.Shape>this.getChildByName("mc" + i);
			mc.graphics.clear();
			mc.graphics.beginFill(0x00ffff, 1);
			mc.graphics.drawRect(0, 0, 50, 50);
			mc.graphics.endFill();
        }
    }
}

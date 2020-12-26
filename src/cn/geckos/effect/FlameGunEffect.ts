/**
 * Created by kanon on 2015/7/11.
 */
module cn.geckos.effect
{
/**
 * 火焰枪效果
 * @author Kanon
 */
export class FlameGunEffect
{
    //发射速度
    private speed:number;
    //发射角度
    private _rotation:number;
    //最大缩放比
    private maxScale:number;
    //最小alpha值
    private minAlpha:number;
    //最大射程距离
    private distance:number;
    //发射位置的浮动
    private floating:number;
    //火焰弹列表
    private flameList:Flame[];
    //外部容器
    private parent:egret.DisplayObjectContainer;
    //发射位置x坐标
    private _startX:number;
    //发射位置y坐标
    private _startY:number;
    //缩放速度
    private scaleSpeed:number;
    //透明度速度
    private alphaSpeed:number;
    //状态
    private _status:number;
    //开火状态
    public static FIRE = 1;
    //停止状态
    public static STOP = 0;
    //火焰纹理
    private frameTexture:egret.Texture;
    public constructor(parent:egret.DisplayObjectContainer,
                      flameResName:string,
                      startX:number = 0, startY:number = 0,
                      speed:number = 5, rotation:number = 0,
                      maxScale:number = 1, minAlpha:number = .1,
                      distance:number = 100, floating:number = 10,
                      scaleSpeed:number = .1, alphaSpeed:number = .05)
    {
        this.parent = parent;
        this.frameTexture = RES.getRes(flameResName);
        this.speed = speed;
        this.rotation = rotation;
        this.maxScale = maxScale;
        this.minAlpha = minAlpha;
        this.distance = distance;
        this.move(startX, startY);
        this.flameList = [];
        this.floating = floating;
        this.scaleSpeed = scaleSpeed;
        this.alphaSpeed = alphaSpeed;
    }

    /**
     * 移动
     * @param    x    发射位置x坐标
     * @param    y    发射位置y坐标
     */
    public move(x:number = 0, y:number = 0):void
    {
        this._startX = x;
        this._startY = y;
    }

    /**
     * 发射
     */
    private fire():void
    {
        var rot:number = this.rotation + this.randnum(-this.floating, this.floating);
        var rad:number = rot / 180 * Math.PI;
        var vx:number = Math.cos(rad) * this.speed;
        var vy:number = Math.sin(rad) * this.speed;
        var flameSpt:Flame = new Flame(this.frameTexture, vx, vy,
                                        this.startX, this.startY,
                                        this.maxScale, this.minAlpha,
                                        this.distance, this.scaleSpeed, this.alphaSpeed);
        flameSpt.rotation = this.rotation;
        this.flameList.push(flameSpt);
        this.parent.addChild(flameSpt);
    }

    /**
     * 渲染
     */
    public update():void
    {
        switch (this._status)
        {
            case FlameGunEffect.FIRE:
                this.fire();
                break;
        }
        //更新火焰弹数据
        var length:number = this.flameList.length;
        for (var i:number = length - 1; i >= 0; i -= 1)
        {
            var flame:Flame = this.flameList[i];
            flame.update();
            if (flame.isOutRange())
            {
                flame.destroy();
                this.flameList.splice(i, 1);
            }
        }
    }

    /**
     * 获取状态
     */
    public get status():number
    {
        return this._status;
    }

    /**
     * 设置状态
     */
    public set status(value:number)
    {
        this._status = value;
    }

    /**
     * 获取角度
     */
    public get rotation():number
    {
        return this._rotation;
    }

    /**
     * 设置角度
     */
    public set rotation(value:number)
    {
        this._rotation = value;
    }

    /**
     * 获取起始x位置
     */
    public get startX():number
    {
        return this._startX;
    }

    /**
     * 获取起始y位置
     */
    public get startY():number
    {
        return this._startY;
    }

    /**
     * 返回 a - b之间的随机数，不包括  Math.max(a, b)
     * @param a
     * @param b
     * @return 假设 a < b, [a, b)
     */
    private randnum(a:number, b:number):number
    {
        return Math.random() * (b - a) + a;
    }
}

export class Flame extends egret.Sprite
{
    //资源
    private bitmap:egret.Bitmap;
    //速度向量
    private vx:number;
    private vy:number;
    //发射位置x坐标
    private startX:number;
    //发射位置y坐标
    private startY:number;
    //最大缩放比
    private maxScale:number;
    //最小alpha值
    private minAlpha:number;
    //最大射程距离
    private distance:number;
    //缩放速度
    private scaleSpeed:number;
    //透明度速度
    private alphaSpeed:number;
    public constructor(flameTexture:egret.Texture, vx:number, vy:number,
                       startX:number, startY:number,
                       maxScale:number, minAlpha:number, distance:number,
                       scaleSpeed:number, alphaSpeed:number)
    {
        super();
        this.startX = startX;
        this.startY = startY;
        this.vx = vx;
        this.vy = vy;
        this.x = startX;
        this.y = startY;
        this.scaleX = .2;
        this.scaleY = this.scaleY;
        this.maxScale = maxScale;
        this.minAlpha = minAlpha;
        this.distance = distance;
        this.scaleSpeed = scaleSpeed;
        this.alphaSpeed = alphaSpeed;
        this.bitmap = new egret.Bitmap(flameTexture);
        this.bitmap.anchorOffsetX = .5 * this.bitmap.width;
        this.bitmap.anchorOffsetY = .5 * this.bitmap.height;
        this.addChild(this.bitmap);
    }

    /**
     * 更新速度
     */
    public update():void
    {
        this.x += this.vx;
        this.y += this.vy;
        this.scaleX += this.scaleSpeed;
        this.scaleY = this.scaleX;
        if (this.scaleX > this.maxScale) this.scaleX = this.maxScale;
        if (this.mathDistance(this.x, this.y, this.startX, this.startY) >= this.distance * .5)
            this.alpha -= this.alphaSpeed;
        if (this.alpha < this.minAlpha) this.alpha = this.minAlpha;
    }

    /**
     * 是否超过射程
     * @return
     */
    public isOutRange():boolean
    {
        return this.mathDistance(this.x, this.y, this.startX, this.startY) >= this.distance;
    }

    /**
     * 计算距离
     * @param    x1    点1的x坐标
     * @param    y1    点1的y坐标
     * @param    x2    点2的x坐标
     * @param    y2    点2的y坐标
     * @return    2点之间的距离
     */
    private mathDistance(x1:number, y1:number, x2:number, y2:number):number
    {
        return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }

    /**
     * 销毁
     */
    public destroy():void
    {
        if (this.bitmap.parent)
            this.bitmap.parent.removeChild(this.bitmap);
        if (this.parent)
            this.parent.removeChild(this);
        this.bitmap = null;
    }
}
}
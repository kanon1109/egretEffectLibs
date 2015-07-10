/**
 * Created by tangben on 2015/7/10.
 */
module cn.geckos.effect
{
/**
 * 绘制2叉树
 * @author Kanon
 */
export class Tree
{
    /**
     * 绘制方法
     * @param	graphics	绘制的图像
     * @param	startX		树的根节点x坐标
     * @param	startY		树的根节点y坐标
     * @param	length		树干的长度
     * @param	angle		树干的倾斜角度
     * @param	depth		树的茂密度
     * @param	branchWidth	树干的宽度
     */
    public static draw(graphics:egret.Graphics,
                       startX:number, startY:number,
                       length:number, angle:number,
                       depth:number, branchWidth:number):void
    {
        //最大分支数
        var maxBranch:number = 3;
        //最大角度为90度
        var maxAngle:number = 2 * Math.PI / 4;
        //结束点的位置根据角度来倾斜
        var endX:number = startX + length * Math.cos(angle);
        var endY:number = startY + length * Math.sin(angle);
        var colorTf:egret.ColorTransform = new egret.ColorTransform();
        //根据深度显示颜色
        if (depth > 2)
        {
            colorTf.redOffset = (Math.random() * 64) + 64;
            colorTf.greenOffset = 50;
            colorTf.blueOffset = 25;
        }
        else colorTf.greenOffset = (Math.random() * 64) + 128;
        /*graphics.lineStyle(branchWidth, colorTf.color, 1, true,
                            LineScaleMode.NORMAL, CapsStyle.ROUND);*/
        graphics.lineStyle(branchWidth, colorTf.color, 1, true);
        graphics.moveTo(startX, startY);
        graphics.lineTo(endX, endY);
        var newDepth:number = depth - 1;
        if (newDepth == 0) return;
        var subBranches:number = Math.random() * (maxBranch - 1) + 1;
        //树干宽度缩小
        branchWidth *= .7;
        for (var i:number = 0; i <= subBranches; i += 1)
        {
            //新角度从一个范围中随机
            var newAngle:number = angle + Math.random() * maxAngle - maxAngle * 0.5;
            var newLength:number = length * (0.7 + Math.random() * 0.3);
            Tree.draw(graphics, endX, endY, newLength, newAngle, newDepth, branchWidth);
        }
    }
}
}
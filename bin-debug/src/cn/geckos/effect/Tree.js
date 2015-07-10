/**
 * Created by tangben on 2015/7/10.
 */
var cn;
(function (cn) {
    var geckos;
    (function (geckos) {
        var effect;
        (function (effect) {
            /**
             * 绘制2叉树
             * @author Kanon
             */
            var Tree = (function () {
                function Tree() {
                }
                var __egretProto__ = Tree.prototype;
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
                Tree.draw = function (graphics, startX, startY, length, angle, depth, branchWidth) {
                    //最大分支数
                    var maxBranch = 3;
                    //最大角度为90度
                    var maxAngle = 2 * Math.PI / 4;
                    //结束点的位置根据角度来倾斜
                    var endX = startX + length * Math.cos(angle);
                    var endY = startY + length * Math.sin(angle);
                    var colorTf = new egret.ColorTransform();
                    //根据深度显示颜色
                    if (depth > 2) {
                        colorTf.redOffset = (Math.random() * 64) + 64;
                        colorTf.greenOffset = 50;
                        colorTf.blueOffset = 25;
                    }
                    else
                        colorTf.greenOffset = (Math.random() * 64) + 128;
                    /*graphics.lineStyle(branchWidth, colorTf.color, 1, true,
                                        LineScaleMode.NORMAL, CapsStyle.ROUND);*/
                    graphics.lineStyle(branchWidth, colorTf.color, 1, true);
                    graphics.moveTo(startX, startY);
                    graphics.lineTo(endX, endY);
                    var newDepth = depth - 1;
                    if (newDepth == 0)
                        return;
                    var subBranches = Math.random() * (maxBranch - 1) + 1;
                    //树干宽度缩小
                    branchWidth *= .7;
                    for (var i = 0; i <= subBranches; i += 1) {
                        //新角度从一个范围中随机
                        var newAngle = angle + Math.random() * maxAngle - maxAngle * 0.5;
                        var newLength = length * (0.7 + Math.random() * 0.3);
                        Tree.draw(graphics, endX, endY, newLength, newAngle, newDepth, branchWidth);
                    }
                };
                return Tree;
            })();
            effect.Tree = Tree;
            Tree.prototype.__class__ = "cn.geckos.effect.Tree";
        })(effect = geckos.effect || (geckos.effect = {}));
    })(geckos = cn.geckos || (cn.geckos = {}));
})(cn || (cn = {}));
//# sourceMappingURL=Tree.js.map
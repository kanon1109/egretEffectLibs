/**
 * Created by tangben on 2015/7/10.
 */
var Tree = cn.geckos.effect.Tree;
var TreeTest = (function (_super) {
    __extends(TreeTest, _super);
    function TreeTest() {
        _super.call(this);
        Tree.draw(this.graphics, 275, 600, 60, -Math.PI / 2, 12, 8);
    }
    var __egretProto__ = TreeTest.prototype;
    return TreeTest;
})(egret.Sprite);
TreeTest.prototype.__class__ = "TreeTest";
//# sourceMappingURL=TreeTest.js.map
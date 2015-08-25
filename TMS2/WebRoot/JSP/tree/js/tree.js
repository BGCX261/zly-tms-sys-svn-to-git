Ext.onReady(function(){
    var tree = new Ext.tree.TreePanel({
        el: 'tree',
        loader: new Ext.tree.TreeLoader({dataUrl: 'JSP/tree/treedata.jsp'})
    });

    var root = new Ext.tree.AsyncTreeNode({
        id: '0',
        text:'Subject主题'
    });

    tree.setRootNode(root);
    tree.render();

    root.expand(false, false);

});

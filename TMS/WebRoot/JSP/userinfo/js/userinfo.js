Ext.onReady(function(){
var store = new Ext.data.Store({
			proxy:new Ext.data.HttpProxy({url:'userinfo/userinfo.action'}),
			reader:new Ext.data.JsonReader({
				totalProperty:'totalProperty',
				root:'root'
			},[
			   {name:'UserID'},
			   {name:'Login'},
			   {name:'PassWord'},
			   {name:'Email'},
			   {name:'UserType'},
			   {name:'Name'},
			   {name:'DeptName'},
			   {name:'UserGroup'},
			   {name:'CreateTime'},
			   {name:'UpdateTime'}
			   //创建时间和更新时间由后台生成
			  ])
		});

var cm=new Ext.grid.ColumnModel([
	{header:'登录名',width: 150,dataIndex:'Login'},
	{header:'用户类型',width: 150,dataIndex:'UserType',renderer:typeColor},
	{header:'用户姓名',width: 150,dataIndex:'Name'},
	{header:'所属部门',width: 200,dataIndex:'DeptName'},
	{header:'所属群组',width: 200,dataIndex:'UserGroup'}
	]);

var grid=new Ext.grid.GridPanel({
	renderTo:Ext.getBody(),
	store:store,
	cm:cm,
	viewConfig: {
		columnsText:'显示的列',
		autoFill:true,
        foreceFit:true,
		scrollOffset:1,
        sortAscText:'降序',
        sortDescText:'升序',
        forceFit: true
    },
    tbar:new Ext.Toolbar({
    	items:['-',{
    		text:'新增',
    		handler:function (){
				add_window.show();
				add_form.getForm().reset();
			}
    	},'-',{
    		text:'查看',
    		handler:function (){
				//
    		}
    	},'-',{
    		text:'删除',
    		handler:function (){
    		var selModel = grid.getSelectionModel();
    		Ext.Msg.confirm('提示信息','确定要删除？',function(btn){
    			if(btn=='yes'){
    				var selections=selModel.getSelections();
    				Ext.each(selections,function(item){
    					Ext.Ajax.request({
    						url:'userinfo/delete.action',
    						success:function(resp){
    						var result=Ext.decode(resp.responseText);
    						Ext.Msg.alert('信息',result.msg);
    						store.load({params:{start:0,limit:10}});
    						update_from.getForm().reset();},
    						failure:function(){},
    						params: { UserID: item.get('UserID'),Name:item.get('Name')}
    						})
    						})
    						}
    			});
    		}
    	},'-']
    	}),
    	sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
    	bbar: new Ext.PagingToolbar({
    	  pageSize:10,
    	  store:store,
    	  displayInfo:true,
    	  displayMsg:'显示第  {0} 条到  {1}  条记录, 一共  {2}  条',
    	  emptyMsg:'没有记录'
    })
});

store.load({params:{start:0,limit:10}});

  // 为用户类型显示 进行渲染
    function typeColor(val){
        if(val == '0'){
            return '<span style="color:green;">' + '系统管理员' + '</span>';
        }else if(val == '1'){
            return '<span style="color:blue;">' + '项目经理' + '</span>';
        }else if(val == '2'){
            return '<span style="color:red;">' + '测试组长' + '</span>';
        }else if(val == '3'){
            return '<span style="color:blue;">' + '开发人员' + '</span>';
        }else if(val == '4'){
            return '<span style="color:red;">' + '测试人员' + '</span>';
        }
        return val;
    }
      
       //用户类型设置为下拉框
     var utypdata=[
    	 ['系统管理员','0'],
    	 ['项目经理','1'],
    	 ['测试组长','2'],
    	 ['开发人员','3'],
    	 ['测试人员','4']
    	 ];
      var utypstore=new Ext.data.SimpleStore({
    	 fields:['text','value'],
    	 data:utypdata
    	 });
      var combo=new Ext.form.ComboBox({
    	 fieldLabel:'用户类型',
    	 editable : false,
    	 hiddenName: 'UserType',
    	 store:utypstore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text'
     });
    
    var update_form = new Ext.form.FormPanel({//更新表单
		autoScroll:true,
		labelAlign:'right',
		labelWidth:100, 
        height:220,
		plain:true,
		frame:true,
		defaultType:'textfield',
		items:[
			new Ext.form.Hidden({
			name:'UserID'
		}),{
			fieldLabel:'登录名',
			name:'Login',
			width:400
		},{
			fieldLabel:'用户邮箱',
			name:'Email',
			width:400
		},
		new Ext.form.ComboBox({
    	 fieldLabel:'用户类型',
    	 editable : false,
    	 hiddenName: 'UserType',
    	 store:utypstore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text'
     }),{
			fieldLabel:'用户姓名',
			name:'Name',
			width:400
		},{
			fieldLabel:'所属部门',
			name:'DeptName',
			width:400
		},{
			fieldLabel:'所属群组',
			name:'UserGroup',
			width:400
		}],
		buttons:[{
			text:'更新',
			handler:function (){
				Ext.lib.Ajax.request(
						'POST',
						'userinfo/update.action',
						{success:function(resp){
							var result=Ext.decode(resp.responseText);
    						Ext.Msg.alert('提示信息',result.msg);
							store.load({params:{start:0,limit:10}});
							update_form.getForm().reset();
						},failure:function(){
							Ext.Msg.alert('信息','请联系管理员');
						}},
						update_form.getForm().getValues(true)//采用缩写模式
					);
			}
		}]
	});
    
     grid.addListener( 'rowdblclick', function( g, rowIdx, eobj ) { // 对grid的行添加点击事件
        var record = store.getAt(rowIdx); // 返回是的一个 Record. Store包含的就是Record[]      
		update_form.getForm().loadRecord(record);
	});
    
    var viewport = new Ext.Viewport({//布局
	layout:'border',
	items:[{
		layout:'fit',
		region:'center',
		items:[grid]
	},{
		region:'south',
		items:[update_form],
		height:220,//该布局无法使用自适应高度
		collapsible:true
	}]
});
    
     var add_form = new Ext.form.FormPanel({//新增表单
		autoScroll:true,
		labelAlign:'right',
		labelWidth:100, 
        height:220,
        width:600,
		plain:true,
		frame:true,
		defaultType:'textfield',
		items:[
			{
			fieldLabel:'登录名',
			name:'Login',
			width:400
		},{
			fieldLabel:'用户邮箱',
			name:'Email',
			width:400
		},
		combo,//下拉框
		{
			fieldLabel:'用户姓名',
			name:'Name',
			width:400
		},{
			fieldLabel:'所属部门',
			name:'DeptName',
			width:400
		},{
			fieldLabel:'所属群组',
			name:'UserGroup',
			width:400
		}],
		buttons:[{
			text:'新增',
			handler:function (){
				Ext.lib.Ajax.request(
						'POST',
						'userinfo/add.action',
						{success:function(resp){
							var result=Ext.decode(resp.responseText);
    						Ext.Msg.alert('信息',result.msg);
							store.load({params:{start:0,limit:10}});
							add_form.getForm().reset();
						},failure:function(){
							Ext.Msg.alert('系统信息','请联系管理员');
						}},
						add_form.getForm().getValues(true)//采用缩写模式
					);
				add_window.hide();
			}
		},{
			text:"取消",
					handler: function(){
						add_window.hide();
						}
		}]
	});   
     
     var add_window = new Ext.Window({
		pageX:250,
		pageY:150,
		layout:'fit',
		modal:true, //设置遮罩，即你要的效果
		closeAction:'hide',
		items:[add_form],
		buttons:[]
		});
    
     
     
});
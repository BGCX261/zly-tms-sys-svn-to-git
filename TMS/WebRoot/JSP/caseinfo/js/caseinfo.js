Ext.onReady(function(){
var store = new Ext.data.Store({
			proxy:new Ext.data.HttpProxy({url:'caseinfo/caseinfo.action'}),
			reader:new Ext.data.JsonReader({
				totalProperty:'totalProperty',
				root:'root'
			},[
			   {name:'CaseID'},
			   {name:'CaseTitle'},
			   {name:'Designer'},
			   {name:'Status'},
			   {name:'PreCondition'},
			   {name:'Steps'},
			   {name:'ExpResult'},
			   {name:'CreateTime'},
			   {name:'UpdateTime'}
			   //创建时间和更新时间由后台生成
			  ])
	});

var cm=new Ext.grid.ColumnModel([
	{header:'用例标题',width: 350,dataIndex:'CaseTitle'},
	{header:'用例设计者',width: 200,dataIndex:'Designer'},
	{header:'用例状态',width: 150,dataIndex:'Status',renderer:typeColor},
	{header:'创建时间',width: 150,dataIndex:'CreateTime'},
	{header:'更新时间',width: 150,dataIndex:'UpdateTime'}
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
				//-------------------------
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
    						url:'caseinfo/delete.action',
    						success:function(resp){
    						var result=Ext.decode(resp.responseText);
    						Ext.Msg.alert('信息',result.msg);
    						store.load({params:{start:0,limit:10}});
    						update_from.getForm().reset();},
    						failure:function(){},
    						params: { CaseID: item.get('CaseID'),CaseTitle:item.get('CaseTitle')}
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

  // 为用例状态显示 进行渲染
    function typeColor(val){
        if(val=="No Run"){
            return '<span style="color:black;">' + 'No Run' + '</span>';
        }else if(val=="Passed"){
            return '<span style="color:green;">' + 'Passed' + '</span>';
        }else if(val=="Failed"){
            return '<span style="color:red;">' + 'Failed' + '</span>';
        }
        return val;
    }
    
    //用例状态设置为下拉框
     var cstatdata=[
    	 ['No Run','No Run'],
    	 ['Passed','Passed'],
    	 ['Failed','Failed']
    	 ];
     var utypstore=new Ext.data.SimpleStore({
    	 fields:['text','value'],
    	 data:cstatdata
    	 });
     var combo=new Ext.form.ComboBox({
    	 fieldLabel:'用例状态',
    	 editable : false,
    	 hiddenName: 'Status',
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
			name:'CaseID'
		}),{
			fieldLabel:'用例标题',
			name:'CaseTitle',
			width:400
		},{
			fieldLabel:'用例设计者',
			name:'Designer',
			width:400
		},
		new Ext.form.ComboBox({
    	 fieldLabel:'用例状态',
    	 editable : false,
    	 hiddenName: 'Status',
    	 store:utypstore,
    	 emptyText:'请选择',
    	 mode:'local',
    	 triggerAction:'all',
    	 valueField:'value',
    	 displayField:'text'
     }),
		{
			fieldLabel:'预置条件',
			name:'PreCondition',
			width:400
		},{
			fieldLabel:'操作步骤',
			name:'Steps',
			width:400
		},{
			fieldLabel:'预期结果',
			name:'ExpResult',
			width:400
		}],
		buttons:[{
			text:'更新',
			handler:function (){
				Ext.lib.Ajax.request(
						'POST',
						'caseinfo/update.action',
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
		width:600,
        height:220,
		plain:true,
		frame:true,
		defaultType:'textfield',
		items:[
			{
			fieldLabel:'用例标题',
			name:'CaseTitle',
			width:400
		},{
			fieldLabel:'用例设计者',
			name:'Designer',
			width:400
		},
		combo,
		{
			fieldLabel:'预置条件',
			name:'PreCondition',
			width:400
		},{
			fieldLabel:'操作步骤',
			name:'Steps',
			width:400
		},{
			fieldLabel:'预期结果',
			name:'ExpResult',
			width:400
//		},{
//			fieldLabel:'创建时间',
//			name:'CreateTime',
//			width:400
//		},{
//			fieldLabel:'更新时间',
//			name:'UpdateTime',
//			width:400
		}],
		buttons:[{
			text:'新增',
			handler:function (){
				Ext.lib.Ajax.request(
						'POST',
						'caseinfo/add.action',
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
})

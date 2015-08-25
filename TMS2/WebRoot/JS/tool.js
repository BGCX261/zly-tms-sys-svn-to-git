/** 
 * 适用于TextField、NumberField给所有TestField添加sideText属性 显示在输入框的侧边 
 */  
Ext.override(Ext.form.TextField, {  
            sideText : '',  
            onRender : function(ct, position) {  
                Ext.form.TextField.superclass.onRender.call(this, ct, position);  
                if (this.sideText != '' && !this.triggerAction) {  
                    this.sideEl = ct.createChild({  
                                tag : 'div',  
                                html : this.sideText  
                            });  
                    this.sideEl.addClass('x-form-sideText');  //可以自己设计样式
                }  
            }  
        }); 
/**  
 * 显示提示框  
 */  
function showInfo(title,msg){   
      var s = 5;   
  var box =Ext.Msg.alert(title,'<br/><br/><b>&nbsp;&nbsp;&nbsp;&nbsp;<div style="color: #15428b; FONT-SIZE: 12px;">'+ msg + '</div>&nbsp;&nbsp;&nbsp;&nbsp;</b><br/><br/>',function (){
	  s=-1;
  });   
  //倒计时5秒后关闭   
  var txt = Ext.Msg.getDialog().buttons[0].getText();   

  Ext.TaskMgr.start({   
    run:function(){   
      if(s<=0){   
        box.hide();   
        return false;   
      }else{   
        Ext.Msg.getDialog().buttons[0].setText('确定'+'('+s+')');   
        s--;   
      }   
    },   
    scope: this,   
    interval: 1000  
  });   
}  
/**  
 * 显示错误框  
 */  
function showError(title,msg){    
  Ext.Msg.alert(title,'<br/><br/><b>&nbsp;&nbsp;&nbsp;&nbsp;<div style="color: #15428b; FONT-SIZE: 12px;">'+ msg + '</div>&nbsp;&nbsp;&nbsp;&nbsp;</b><br/><br/>');    
}  
/**  
 * 显示确认提示框  
 */  
function showConfirm(title,msg,fn){    
  Ext.Msg.confirm(title,'<br/><br/><b>&nbsp;&nbsp;&nbsp;&nbsp;<div style="color: #15428b; FONT-SIZE: 12px;">'+ msg + '</div>&nbsp;&nbsp;&nbsp;&nbsp;</b><br/><br/>',fn)   
}  
//时间转换(存在兼容性问题)
function getLocalTime(nS) {   
    return new Date(parseInt(nS) * 1000).toLocaleString();    
}   
//alert(getLocalTime(1322122023)); 
//方法二可行对Date类进行拓展
Date.prototype.format = function(format) 
{ 
var o = 
{ 
"M+" : this.getMonth()+1, //month 
"d+" : this.getDate(), //day 
"h+" : this.getHours(), //hour 
"m+" : this.getMinutes(), //minute 
"s+" : this.getSeconds(), //second 
"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
"S" : this.getMilliseconds() //millisecond 
} 

if(/(y+)/.test(format)) 
{ 
format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
} 

for(var k in o) 
{ 
if(new RegExp("("+ k +")").test(format)) 
{ 
format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
} 
} 
return format; 
} 
var testDate = new Date( 1322122023000 );//这里必须是整数，毫秒 
var testStr = testDate.format("yyyy年MM月dd日hh小时mm分ss秒"); 
var testStr2 = testDate.format("yyyy-MM-dd hh:mm:ss"); 
//alert(testStr + " " + testStr2); 

//double时间戳转日期类型
	function doubleToDate(val){
		var testDate = new Date( val );//根据tool.js内的继承和拓展
		return testDate.format("yyyy-MM-dd hh:mm:ss");//返回指定格式日期
	}
	//毫秒数转时间差
function doubleToTime(val){
	var returnVal="";
	//计算出相差天数
	var days=Math.floor(val/(24*3600*1000));
 
	//计算出小时数

	var leave=val%(24*3600*1000);    //计算天数后剩余的毫秒数
	var hours=Math.floor(leave/(3600*1000));
	//计算相差分钟数
	var leave2=leave%(3600*1000);        //计算小时数后剩余的毫秒数
	var minutes=Math.floor(leave2/(60*1000));
 

	//计算相差秒数
	var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
	var seconds=Math.round(leave3/1000);
 	
	if(days>0)
		returnVal=days+"天"+hours+"小时"+minutes+"分钟"+seconds+"秒";
	else{
		if(hours>0)
			returnVal=hours+"小时"+minutes+"分钟"+seconds+"秒";
		else
			returnVal=minutes+"分钟"+seconds+"秒";
	}
	return returnVal;
}
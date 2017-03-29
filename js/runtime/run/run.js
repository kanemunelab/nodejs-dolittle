(function(){this['system']['use']("arduino");
return this['arduino']['action']=dtlbind(this,function(){
var self=this;var 自分=self;
this['かめた']=this['タートル']['作る']();
this['オン']=this['タートル']['作る']()['ペンなし']()['変身する']("apple.png")['位置']((100),(100));
this['オフ']=this['タートル']['作る']()['ペンなし']()['変身する']("tulip.png")['位置'](-(100),-(100));
this['オン']['衝突']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['arduino']['pin']((13))['ON']();
});
this['オフ']['衝突']=dtlbind(this,function(){
var self=this;var 自分=self;
return this['arduino']['pin']((13))['OFF']();
});
this['時計']=this['タイマー']['作る']()['実行'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['かめた']['歩く']((10));
}));
this['左']=this['ボタン']['作る']("左","left")['動作設定'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['かめた']['左回り']((30));
}));
return this['右']=this['ボタン']['作る']("右","right")['動作設定'](dtlbind(this,function(){
var self=this;var 自分=self;
return this['かめた']['右回り']((30));
}));
});
}).checkerror().apply(root,[]);
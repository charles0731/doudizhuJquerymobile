// 定义本工程的名字空间
window.qc = {};
qc.landlord = {};

// 用来存放所有的全局数据（函数、变量等）
window.G = qc.landlord.G = {};
var AICardType = qc.landlord.AICardType = function(v, list){
	this.val = v;
    this.cardList = list;
};

// Called when the script instance is being loaded.
//AICardType.prototype.awake = function() {
//
//};

// Called every frame, if the behaviour is enabled.
//AICardType.prototype.update = function() {
//
//};

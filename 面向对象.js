//面向对象编程
//创建原型继承的一种方法,JS中没有类的概念，通过原型来实现面向对象编程

//原型对象
var Student={
	name:'Jack',
	height:1.2,
	run:function(){
		console.log(this.name+' is running');
	}
};
function creatStudent(name){
	//基于Student原型创建一个新对象
	var s=Object.create(Student);
	// 初始化新对象
	s.name=name;
	return s;
}
var zhichao=creatStudent('支超');
zhichao.run();//支超 is running
zhichao.__proto__ ===Student;//true

//方法二   构造函数
function Student(name){
	this.name=name,
	this.height=1.2
}
Student.prototype.run=function(){
		console.log(this.name+' is running');
	}
var zhichao=new Student('支超');
zhichao.name;//支超
zhichao.run();//支超 is running
// 如果不写new，这就是一个普通函数，它返回undefined。但是，如果写了new，它就变成了一个构造函数，
// 它绑定的this指向新创建的对象，并默认返回this，也就是说，不需要在最后写return this;。

//原型继承，从Student派生PrimaryStudent对象
// 原型继承封装
function inherits(Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
}
function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}

function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 实现原型继承链:
inherits(PrimaryStudent, Student);

// 绑定其他方法到PrimaryStudent原型:
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};
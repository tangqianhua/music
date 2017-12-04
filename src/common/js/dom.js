//添加class
export function addClass(el,className){
  if(hasClass(el,className)){//如果存在class
    return
  }
  var newClass=el.className.split(' ');
  newClass.push(className);
  el.className=newClass.join(' ')
}

//判断是否存在className
export function hasClass(el,className){
  var reg=new RegExp('(^|\\s)'+className+'(\\s|$)')
  return reg.test(el.className)
}

export function getDate(el,name,val){
	const data = 'data-'
	var name = data+name
	if(val){
		return el.setAttribute(name,val)
	}else{
		return el.getAttribute(name)
	}
}
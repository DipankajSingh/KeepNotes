let arr=['this','is','a','array'];
arr.find((value,index)=>{
  if (value=='array') {
    arr.splice(index,1);
  }
})

console.log(arr);

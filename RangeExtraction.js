// 

function solution (arr) {
// iterate values
// is value and value +1 contiguious
// value + 1 + 1 is range minimum
//
 var result = ''
 var potentialRange
 var rangeStart, rangeEnd
  for(var x = 0; x < arr.length; x++){
   
    // work looking backwards
    for(var y = x - 1; y < arr.length; y ++){
      if(arr[y] === arr[x] + y){
        if(arr[y+1] === arr[y]+1){
          rangeStart = x
        }

        
      }

    }
    
  }
}




solution([-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);
// returns "-10--8,-6,-3-1,3-5,7-11,14,15,17-20"
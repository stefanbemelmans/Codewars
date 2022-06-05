
function solution(arr) {
  var result = []
  var rangeStart
  var result = [];
  var inRange = false
  for (var x = 0; x < arr.length; x++) {
    var y = x + 1
    var z = x + 2
    console.log('x and y : ', x, y)
    if (Math.abs(Math.abs(arr[x]) - Math.abs(arr[y])) === 1) { // x and y are consecutive
      if (z === arr.length) {
        result.push(`${rangeStart}-${arr[y]}`)
        break
      }
      if (Math.abs(Math.abs(arr[y]) - Math.abs(arr[z])) === 1) { // y and z are consecutive - starting range
        if (!inRange) {
          inRange = true
          rangeStart = arr[x]
          console.log('starting range = ' + rangeStart)
          x = y
          continue
        }
        else {
          x = y
          continue
        }
      }

      if (!inRange) {
        result.push(arr[x], arr[y])
        x = y
        continue
      }
      if (inRange) {
        result.push(`${rangeStart}-${arr[y]}`)
        inRange = false
        x = y 
        continue
      }
    }
    if (inRange) {
      result.push(`${rangeStart}-${arr[x]}`)
      inRange = false
      continue
    }
    result.push(arr[x])

    }

    console.log(result.toString())

  }

/* Pass */
  // solution([-10, -9, -8, -6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]);
  // returns "-10--8,-6,-3-1,3-5,7-11,14,15,17-20"

  // solution([-69, -68, -65, -64, -63, -62, -60, -57, -54, -52, -51, -49, -48, -45])
  // returns '-69,-68,-65--62,-60,-57,-54,-52,-51,-49,-48,-45'
/* Not Pass */
  solution([-3,-2,-1,2,10,15,16,18,19,20]) // dealing with 0
  // returns '-3--1,2,10,15,16,18-20'

  // solution('-79,-77,-75,-73,-72,-70--66,-63,-60,-58,-55,-70--51') 
  // return '-79,-77,-75,-73,-72,-70--66,-63,-60,-58,-55,-52,-51'
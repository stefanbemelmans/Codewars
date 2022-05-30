var codeMap = []
var stack = []
// var result = []
var mathSymbols = '+-*/%!`'.split('')
var movementSymbols = '><^v'.split('')
var miscSymboles = ':\\$.,#_|?'.split('')
const right = '>'
const left = '<'
const up = '^'
const down = 'v'
var a, b, currentChar, currentDirection
var xPos = 0
var yPos = 0
var Isrunning = false

function PushToStack(codeChar) {
  console.log('pushing to stack: ', codeChar)
  stack.push(codeChar)
}

const PopAb = () => {
  a = stack.pop()
  b = stack.pop()
  console.log('Popping ab: a: ' + a + '  b: ' + b)
  return [parseInt(a), parseInt(b)]
}

const PopOne = () => {
  return stack.pop()
}

function MiscFunctions(codeChar) {
  console.log('MiscFunctions! ' + codeChar)
  switch (codeChar) {
    case '.':
      var top = PopOne()
      result.push(parseInt(top))
      break
    case ':':
      stack.length > 0 ? PushToStack(stack[0]) : PushToStack(0)
      break
    case '\\':
      if (stack.length === 1) {
        PushToStack(0)
      } else {
        var top2 = PopAb()
        PushToStack(top2[0])
        PushToStack(top2[1])
      }
      break
    case '$':
      PopOne()
      break
    case ',':
      PushToStack(String.fromCharCode(PopOne()))
      break
    case '#':
      break
    case '_':
      var one = PopOne()
      currentDirection = parseInt(one) === 0 ? currentDirection = right : currentDirection = left
      break
    case '?':
      var rando = Math.floor(Math.random() * 4)
      var direction
      console.log('rando: ' + rando)
      switch (rando) {
        case 0:
          direction = up
          break
        case 1:
          direction = right
          break
        case 2:
          direction = down
          break
        case 3:
          direction = left
          break
        default:
          throw console.error(rando);
      }
      currentDirection = direction
      console.log('set currentDirection by rando: rando: ' + rando + 'direction: ' + direction)
      break
    case '|':
      var popOne = PopOne()
      popOne === 0 ? currentDirection = down : currentDirection = up
    default:
      throw console.error(codeChar);
  }
}

function MathFunctions(codeChar) {
  console.log('MathFunctions!')
  var abArray = PopAb()
  switch (codeChar) {
    case '+':
      var addition = abArray[0] + abArray[1]
      PushToStack(addition)
      console.log('stack in Add: ' + stack)
      break
    case '-':
      var subtraction = (abArray[1] - abArray[0])
      PushToStack(subtraction)
      console.log('stack in subract: ' + stack)
      break
    case '*':
      var multiply = (abArray[0] * abArray[1])
      PushToStack(multiply)
      console.log('stack in multiply: ' + stack)
      break
    case '/':
      console.log('stack in division: ' + abArray)
      abArray[0] === 0 ? PushToStack(0) : PushToStack(Math.floor(abArray[1] / abArray[0]))
      break
    case '%':
      console.log('stack in modulo: ' + abArray)
      abArray[0] === 0 ? PushToStack(0) : PushToStack(abArray[1] % abArray[0])
      break
    case '!':
      console.log('stack in bang: ' + abArray)
      var bang = PopOne()
      bang === 0 ? PushToStack(0) : PushToStack(1)
      break
    case '`':
      console.log('stack in backtick: ' + abArray)
      var backtick = abArray[1] > abArray[0]
      !backtick ? PushToStack(0) : PushToStack(1)
      break
    default:
      console.log('default in Math switch')
  }
}
 
function Eval(codeChar) {
  if (Number.isInteger(parseInt(codeChar))) {
    PushToStack(codeChar)
  } else
    if (mathSymbols.includes(codeChar)) {
      MathFunctions(codeChar)
    } else
      if (miscSymboles.includes(codeChar)) {
        MiscFunctions(codeChar)
      }
}

const BuildCodeMap = (lineArray) => {
  lineArray.forEach((line, index) => { // index is row
    var row = index
    var charArray = line.split('')
    codeMap[row] = charArray
  })
}

// ======== Cursor Movement ================//
function MoveRight() {
  if (yPos === codeMap[xPos].length -1) {
    yPos = 0
  } else {
    yPos += 1
  }
  return codeMap[xPos][yPos]
}
function MoveLeft() {
  if (yPos === 0) {
    yPos = codeMap[xPos].length - 1
  } else {
    yPos -= 1
  }
  return codeMap[xPos][yPos]
}
function MoveUp() {
  if (xPos === 0) {
    xPos = codeMap.length - 1
  } else {
    xPos -= 1
  }
  return codeMap[xPos][yPos]
}
function MoveDown() {
  if (xPos === codeMap.length - 1) {
    xPos = 0
  } else {
    xPos += 1
  }
  return codeMap[xPos][yPos]
}
function Move(direction) {
  switch (direction) {
    case right:
      return MoveRight()
    case down:
      return MoveDown()
    case left:
      return MoveLeft()
    case up:
      return MoveUp()
    default:
      console.log('default in Move: ' + direction)
      return false
  }
}

function ClearData() {
  stack = []
  result = ''
  codeMap = []
  console.log('Data is cleared ' + stack + result + codeMap)
}

function interpret(code) {
  console.log('code: \n' +  code)
  var lineArray = code.split('\n')
 
  BuildCodeMap(lineArray)
  currentChar = codeMap[xPos][yPos]

  Isrunning = true
  while (currentChar !== '@') {
    if (movementSymbols.includes(currentChar)) {
      currentDirection = currentChar
      currentChar = Move(currentDirection)
      continue
    }
    Eval(currentChar)

    currentChar = Move(currentDirection)
  }

  var output = result.join('').toString()
  console.log('output: ' + output)
  ClearData()
  return output
}
var randoTest = 'v@.<\n>1^\n>?<^\n>2^'
// console.log(interpret('82+')) // should be 10
// console.log(interpret('>987v>.v\nv456<  :\n>321 ^ _@'))=========== // works
console.log(interpret('v@.<\n>1^\n>?<^\n>2^'))
// console.log(interpret(randoTest))
// console.log(interpret('>987v\nv4?5<\n>321@'))
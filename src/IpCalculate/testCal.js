// https://jodies.de/ipcalc?host=192.170.1.0&mask1=27&mask2=


listMilestonedHost = [8, 16, 24, 32];
netzmaske = [255, 255, 255, 255];
valueDezimalOfWildcardsuffixNullPosition = [0, 1, 3, 7, 15, 31, 63, 127, 255];
wildCard = [0, 0, 0, 0];
indexNetzmaskeNsisaL = [];
listMilestoned = [1,2,4,8,16,32,64,128]
// function findSuffix(numHost){
//   var num = parseInt(numHost) + 2
//   var suffix = 32
//   for(var i = 0; i < this.listMilestoned.length; i++){
//     if(num < this.listMilestoned[i]){
//       suffix = suffix - i
//       break
//     }
//   }
//   return suffix;
// }
function findSuffix(numHost){
  var num = parseInt(numHost) + 2
  var suffix = Math.log2(num)

  return parseInt(suffix) + 1 ;
}
// console.log("suffix", findSuffix('5'))


function findNumOfNullInLeftHost(suffix) {
   var arr = [];
   var index = 0;
   for( var i = 0; i <listMilestonedHost.length; i++){
     if(listMilestonedHost[i] > suffix) {
       arr.push(listMilestonedHost[i] - suffix) ;
       arr.push(index);
     }
     index ++;
   }
   return arr;
 }




function findNetzMaskeInAList(suffix){
  const numberOfBitsLeftForHost = findNumOfNullInLeftHost(suffix)[0]
  const indexNetzmaske = findNumOfNullInLeftHost(suffix)[1]


  for( var i = 0; i< netzmaske.length; i++){

    if(i > indexNetzmaske){
      netzmaske[i] = 0
    }else if(i == indexNetzmaske) {
      netzmaske[i] = netzmaske[i] - valueDezimalOfWildcardsuffixNullPosition[numberOfBitsLeftForHost]
    }
  }
  return netzmaske
}
console.log("findNetzMaskeInAList(suffix)" ,findNetzMaskeInAList(27))
function convertNetzMaskeToString(suffix){
    netzMaskeArr = findNetzMaskeInAList(suffix)
  return  netzMaskeArr.join('.')
}

// firstHost = ip[3] + 1;
//  fistHostInString = firstHost.join(".")
// ______________

    /*Broadcast*/
    ip = '192.170.1.32'

  function  convertToInt(ip) {
      arrIp = ip.split(".")
      for (var i = 0; i < arrIp.length; i++) arrIp[i] = parseInt(arrIp[i]);
      return arrIp;
    }
    ip = convertToInt(ip)
function setBroadcast(suffix){
  const numberOfBitsLeftForHost = findNumOfNullInLeftHost(suffix)[0]
  const indexNetzmaske = findNumOfNullInLeftHost(suffix)[1]
  for(var i = 0; i < ip.length; i++){
    if(i > indexNetzmaske){
      ip[i] = 255;
    }
    else if (i == indexNetzmaske){
      ip[i] = ip[i] + valueDezimalOfWildcardsuffixNullPosition[numberOfBitsLeftForHost];
    }
  }
  return ip;
}
console.log("setBroadcast",setBroadcast(27))




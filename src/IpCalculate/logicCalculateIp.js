// var per = 0;
export class mathIp {

  netzmaske = [255, 255, 255, 255];
  valueDezimalOfWildcardPerNullPosition = [0, 1, 3, 7, 15, 31, 63, 127, 255];
  wildCard = [0, 0, 0, 0];
  indexNetzmaskeNsisaL = [];

  checkIp(ip) {
    if (ip == undefined || ip == null) {
      ip = "";
    }
    ip = ip.split(".");

    var betul = true;
    if (ip.length != 4) betul = false;
    else {
      for (var i = 0; i < ip.length; i++) {
        if (parseInt(ip[i]) >= 0 && parseInt(ip[i]) <= 255) {
          for (var j = 0; j < ip[i].length; j++) {
            if (parseInt(ip[i][j]) >= 0 && parseInt(ip[i][j]) <= 255) {
              betul = true;
            } else {
              betul = false;
              break;
            }
          }
          if (betul == false) break;
        } else {
          betul = false;
          break;
        }
      }
    }
    return betul;
  }

  listMilestoned = [1,2,4,8,16,32,64,128]
 findSuffix(numHost){
  var num = parseInt(numHost) + 2
  var suffix = 32
  for(var i = 0; i < this.listMilestoned.length; i++){
    if(num < this.listMilestoned[i]){
      suffix = suffix - i
      break
    }
  }
  return suffix;
}


  convertToInt(ip) {

    ip = ip.split(".")
    for (var i = 0; i < ip.length; i++) ip[i] = parseInt(ip[i]);
    return ip;
  }

  findNumOfNullInLeftHost(suffix) {
    var arr = [];
    var index = 0;
 var listMilestonedHost = [8, 16, 24, 32];

    for( var i = 0; i <listMilestonedHost.length; i++){
      if(listMilestonedHost[i] > suffix) {
        arr.push(listMilestonedHost[i] - suffix) ;
        arr.push(index);
      }
      index ++;
    }
    return arr;
  }
  findNetzMaskeInAList(suffix){
    const numberOfBitsLeftForHost = this.findNumOfNullInLeftHost(suffix)[0]
    const indexNetzmaske = this.findNumOfNullInLeftHost(suffix)[1]


    for( var i = 0; i< this.netzmaske.length; i++){

      if(i > indexNetzmaske){
        this.netzmaske[i] = 0
      }else if(i == indexNetzmaske) {
        this.netzmaske[i] = this.netzmaske[i] - this.valueDezimalOfWildcardPerNullPosition[numberOfBitsLeftForHost]
      }
    }
    return this.netzmaske
  }

  convertNetzMaskeToString(suffix){
   const  netzMaskeArr = this.findNetzMaskeInAList(suffix)
  return  netzMaskeArr.join('.')
}

findBroadcast(suffix,ip){

  ip = this.convertToInt(ip)
  const broadcast = ip
  const numberOfBitsLeftForHost = this.findNumOfNullInLeftHost(suffix)[0]
  const indexNetzmaske = this.findNumOfNullInLeftHost(suffix)[1]
  for(var i = 0; i < broadcast.length; i++){
    if(i > indexNetzmaske){
      broadcast[i] = 255;
    }
    else if (i == indexNetzmaske){
      broadcast[i] = broadcast[i] + this.valueDezimalOfWildcardPerNullPosition[numberOfBitsLeftForHost];
    }
  }
  // broadcast[3] = broadcast[3] - 1
  return broadcast;
}

  findWildCard(netzmaske){
    for(var i = 0; i < this.wildCard.length;i++){
      this.wildCard[i] = Math.abs(netzmaske[i] - 255);

    }
    return this.wildCard.join(".")
  }







}

// export class findSubnetMask{

//    listStandardHost = [8, 16, 24, 32];
//    dns = [255, 255, 255, 255];
//    subValueOfNullPosition = [0, 1, 3, 7, 15, 31, 63, 127, 255];
//    wildCard = [0, 0, 0, 0];
//    indexDnsNsisaL = [];

//     findSuffix(per){
//       var arr = [];
//       var index = 0;
//       for( var i = 0; i <listStandardHost.length; i++){
//         if(listStandardHost[i] > per) {
//           arr.push(listStandardHost[i] - per - 2) ;
//           arr.push(index);
//         }
//         index ++;
//       }
//       return arr;
//     }

// }






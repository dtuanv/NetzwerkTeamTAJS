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


// find suffix


findSuffix(numHost){
  var num = parseInt(numHost) + 2
  var numNull = 0
if(Number.isInteger(Math.log2(num))){
   numNull = parseInt(Math.log2(num))

}else{
   numNull = parseInt(Math.log2(num)) + 1

}
 var  suffix = 32 - numNull

  return suffix ;
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
      // 27 - 5 null
      // 8.8.8.8
    for( var i = 0; i <listMilestonedHost.length; i++){
      if(listMilestonedHost[i] >= suffix) {
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
// valueDezimalOfWildcardPerNullPosition = [0, 1, 3, 7, 15, 31, 63, 127, 255];
 valueDezimalOfWildcardPerNullPositionNew = [0, 1, 3, 7, 15, 31, 63, 127, 255];

 findNumNearestWithIndex(x,arr){
  var y = 0
  for(var i = 0; i < arr.length; i++ ){
    if(arr[i] >= x){
       y = i
       break;
    }
  }
  return y
}

findBroadcast(suffix,ip,index){
 const ipi = this.convertToInt(ip)
  const broadcast = ipi
  const numberOfBitsLeftForHost = this.findNumOfNullInLeftHost(suffix)[0]
  const indexNetzmaske = this.findNumOfNullInLeftHost(suffix)[1]
  for(var i = 0; i < broadcast.length; i++){
    if(i > indexNetzmaske){
      broadcast[i] = 255;
    }
    // valueDezimalOfWildcardPerNullPosition = [0, 1, 3, 7, 15, 31, 63, 127, 255];
    else if (i == indexNetzmaske){
      if(index== 0   ){
        if( broadcast[i] <= this.valueDezimalOfWildcardPerNullPosition[numberOfBitsLeftForHost]){
          broadcast[i] = 0
        }

      }

      broadcast[i] = broadcast[i] + this.valueDezimalOfWildcardPerNullPosition[numberOfBitsLeftForHost];
      if(index == 0){

        // 25

          if(suffix == 25 ){
            const ipi25 = this.convertToInt(ip)
            var list25 = []
              for(var i = 127 ; i <= 255 ;){
                list25.push(i)
                i = i +128;
              }
              // var list30 = [3,7,11,15,19,23,31,39,47,55,63,71,79,87,95,103,111,119,127,135,143,151,159,167,175,183,191,199,207,215,223,231,239,247,255]
              broadcast[3] = ipi25[3]
             var indexIn25 = this.findNumNearestWithIndex(ipi25[3],list25)
              broadcast[3] = list25[indexIn25]
             if(broadcast[3] == 0){
              broadcast[3] = 127
             }
            }
        // 26
        if(suffix == 26 ){
          var list26 = [63,127,191,255]
         var indexIn26 = this.findNumNearestWithIndex(broadcast[3],list26)
         broadcast[3] = list26[indexIn26]
         if(broadcast[3] == 0){
          broadcast[3] = 31
         }

        }

        // 27
        if(suffix == 27 ){
        const ipi27 = this.convertToInt(ip)

          var list27 = [31,63,95,127,159,191,223,255]
          broadcast[3] = ipi27[3]
         var indexIn27 = this.findNumNearestWithIndex(ipi27[3],list27)
        //  var indexIn26finf32 = this.findNumNearestWithIndex(32,list26)
          broadcast[3] = list27[indexIn27]
         if(broadcast[3] == 0){
          broadcast[3] = 31
         }

        }
        // 28
        if(suffix == 28 ){
          const ipi28 = this.convertToInt(ip)

            var list28 = [15,31,47,63,79,95,111,127,143,159,175,191,207,223,239,255]
            broadcast[3] = ipi28[3]
           var indexIn28 = this.findNumNearestWithIndex(ipi28[3],list28)
            broadcast[3] = list28[indexIn28]
           if(broadcast[3] == 0){
            broadcast[3] = 15
           }
          }
     // 29
        if(suffix == 29 ){
          const ipi29 = this.convertToInt(ip)

            var list29 = [7,15,23,31,39,47,55,63,71,79,87,95,103,111,119,127,135,143,151,159,167,175,183,191,199,207,215,223,231,239,247,255]
            broadcast[3] = ipi29[3]
           var indexIn29 = this.findNumNearestWithIndex(ipi29[3],list29)
            broadcast[3] = list29[indexIn29]
           if(broadcast[3] == 0){
            broadcast[3] = 7
           }
          }

          // 30
        if(suffix == 30 ){
          const ipi30 = this.convertToInt(ip)
          var list30 = []
            for(var i = 3 ; i <= 255 ;){
              list30.push(i)
              i = i +4;
            }
            // var list30 = [3,7,11,15,19,23,31,39,47,55,63,71,79,87,95,103,111,119,127,135,143,151,159,167,175,183,191,199,207,215,223,231,239,247,255]
            broadcast[3] = ipi30[3]
           var indexIn30 = this.findNumNearestWithIndex(ipi30[3],list30)
            broadcast[3] = list30[indexIn30]
           if(broadcast[3] == 0){
            broadcast[3] = 7
           }
          }

      // 31
      if(suffix == 31 ){
        const ipi31 = this.convertToInt(ip)
        var list31 = []
          for(var i = 1 ; i <= 255 ;){
            list31.push(i)
            i = i +1;
          }
          // console.log("list30",list30)
          // var list30 = [3,7,11,15,19,23,31,39,47,55,63,71,79,87,95,103,111,119,127,135,143,151,159,167,175,183,191,199,207,215,223,231,239,247,255]
          broadcast[3] = ipi31[3]
         var indexIn31 = this.findNumNearestWithIndex(ipi31[3],list31)
          broadcast[3] = list31[indexIn31]
         if(broadcast[3] == 0){
          broadcast[3] = 1
         }
        }
      }
    }
  }

  return broadcast;
}

  findWildCard(netzmaske){
    for(var i = 0; i < this.wildCard.length;i++){
      this.wildCard[i] = Math.abs(netzmaske[i] - 255);

    }
    return this.wildCard.join(".")
  }
}

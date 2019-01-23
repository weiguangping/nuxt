//0验证成功，1为空，2格式不正确
export default{
    email(data){
      if(data==''||data==undefined){
        return 1;
      }else{
        let regEmail= /^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!regEmail.test(data)){
          return 2;
        }else{
          return 0;
        }
      }

    },
    password(data){

      if(!data){
        return 1;
      }else{
        let regPassword =/(((?=.*[0-9])(?=.*[A-z]))|((?=.*[A-z])(?=.*[^A-z0-9]))|((?=.*[0-9])(?=.*[^A-z0-9]))^).{8,16}/;
       
        if(!regPassword.test(data)){
          return 2;
        }else{
          if(data.length>16){
            return 2;
          }
          return 0;
        }
      }
    },
    again(data,pwd){
        if(!data){
          return 1;
        }else{
          if(data != pwd){
            return 2;
          }else {
            return 0;
          }
        }
    },
    code(data){
      if(!data){
        return 1;
      }else{
        return 0;
      }
    },
    phone(data){
      if(!data){
        return 1;
      }else if(!(/(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/.test(data))){
        return 2;
      }else{
        return 0;
      }
    },
    trade(data){
        if(!data){
          return 1;
        }else if(!(/^\d{6}$/.test(data))){
          return 2;
        }else{
          return 0;
        }
    },
    identity(data){
        return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(data)==false?2:0;
    },
    google(data){
      if (!data) {
        return 1
      } else if (!/^\d{6,}$/.test(data)) {
        return 2
      } else {
        return 0
      }
    }
}


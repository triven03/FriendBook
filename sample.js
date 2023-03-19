


const result =[{
    
    Name: 'Trivendra Sahu',
    Email: 'trivendra.sahu@ssipmt.com',
    Password: '12345678',
    Mobile: 9755676168,
    ProfilePhoto: '5cd6c436cfee2560a892731d7a9bf504',
    Friends: [
      {
        Name: 'Ashutosh Dubey',
        Email: 'ram@gmail.com',
        Password: '12345678',
        Mobile: '7000700080',
        ProfilePhoto: 'ed037a8eebaf58a5dab257e24ca4d672',
        id: "64167e1337b3efb565effcaa"
      }
    ],
    __v: 0
  },{
    
    Name: 'Ashutosh Dubey',
    Email: 'ram@gmail.com',
    Password: '12345678',
    Mobile: 7000700080,
    ProfilePhoto: 'ed037a8eebaf58a5dab257e24ca4d672',
    Friends: [],
    __v: 0
  },{
    
    Name: 'Prashant pandey ',
    Email: 'pd675398@gmail.com',
    Password: '12345678',
    Mobile: 7070707070,
    ProfilePhoto: '84c920cb4b42cbcf49bfb1572e1919ad',
    Friends: [],
    __v: 0
  },{
    
    Name: 'Parul dubey',
    Email: 'paruldubey1712@gmail.com',
    Password: '12345678',
    Mobile: 8080808080,
    ProfilePhoto: '120ef13292495e38c22897f968d5b5cd',
    Friends: [],
    __v: 0
  },{
    
    Name: 'Sita Devi',
    Email: 'sita@gmail.com',
    Password: '12345678',
    Mobile: 6060606060,
    ProfilePhoto: '7d9236d90fb39ac9ba91a93a9577a761',
    Friends: [],
    __v: 0
  }]


  const friend ={
    
    Name: 'Trivendra Sahu',
    Email: 'trivendra.sahu@ssipmt.com',
    Password: '12345678',
    Mobile: 9755676168,
    ProfilePhoto: '5cd6c436cfee2560a892731d7a9bf504',
    Friends: [
      {
        Name: 'Ashutosh Dubey',
        Email: 'ram@gmail.com',
        Password: '12345678',
        Mobile: '7000700080',
        ProfilePhoto: 'ed037a8eebaf58a5dab257e24ca4d672',
        id: "64167e1337b3efb565effcaa"
      }
    ],
    __v: 0
  }


  let is_friend =  result.filter((a)=>{
    return friend.Friends.find((b)=>{
        return a.Mobile==b.Mobile
    });
});

  let is_notfriend =  result.filter((a)=>{
    return !friend.Friends.find((b)=>{
        return a.Mobile==b.Mobile
    });
});


let not_user=  is_notfriend.filter((a)=>{
  return a.Mobile!=friend.Mobile
})

console.log(is_friend);
console.log(is_notfriend);
console.log(not_user);

console.log(is_friend.length)
console.log(is_notfriend.length)
console.log(not_user.length)
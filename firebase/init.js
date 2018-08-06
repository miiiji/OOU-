/*fire base 기본 고객 정보 가져오기*/
person = [];	
var temp="";
var html = "";
var e ="";
  var config = {
    apiKey: "AIzaSyBcqcqAaFIhuFcWadAPD2r0b98Qrfx-4LM",
    authDomain: "web-final-40a5d.firebaseapp.com",
    databaseURL: "https://web-final-40a5d.firebaseio.com",
    projectId: "web-final-40a5d",
    storageBucket: "web-final-40a5d.appspot.com",
    messagingSenderId: "75275871267"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  

function getUserData(){
	var sharing = document.getElementById("sharing");
	var ref = database.ref('users/' + sharing.value + "/meetinginfo");
	ref.once('value').then(function(snapshot){
		if(snapshot.val() == null){
			alert('등록되지 않은 미팅입니다. 다시 입력 해 주세요.');
		}
		snapshot.forEach(function(childSnapshot) {
		    var childKey = childSnapshot.key;
		    var childData = childSnapshot.val(); 
		 //  console.log(childData.email);
		    	e += childData.email+"+";
		
		   console.log(childKey);
		    // ...
		  });
		calcu(e);
	});
}  
  	

function calcu(e){
	var resulting = [];
	var temp_r = [];
	var dum = "";
	var boo = true;
	email = e.split("+");	
	var ref = database.ref('email/');
	ref.once('value').then(function(snapshot){
		snapshot.forEach(function(childSnapshot) {
		    var childKey = childSnapshot.key;
		    var childData = childSnapshot.val(); 
		    console.log(childData.email);
		    for(var i =0; i<email.length-1; i++){
		    		if(childData.email == email[i]){
		    			resulting.push(childData.day);
		    		}
		    }
		  });
		var a = resulting[0].split("+");
		console.log(a);
		console.log(resulting);
		for(var i =0; i<a.length-1; i++){
			for(var j=1;j<resulting.length; j++){
				if(resulting[j].match(a[i])){
					boo = true;
				}else{
					boo = false;
					break;
				}
			}
			if(boo == true){
				dum += a[i]+"*";
			}
		}
		console.log(dum);
		var show = dum.split("*");
	
		for(var i =0; i<show.length-1;i++){
			html += (show[i]+"</br>");
		}
		document.getElementById("final-result").innerHTML = html;
		document.getElementById("final-result").style.color = "#43383e";
	});
}





function writeUserData() {
	var name = document.getElementById("name");
	var email = document.getElementById("email");
	var phone = document.getElementById("phone");
	var mes = document.getElementById("mes");
//	database.ref('/메').set('/안');
	var userRef = database.ref('/users/'+name.value+"/meetinginfo");
	if(email.value =="" || phone.value =="" || mes.value==""){
		alert("모든 항목을 채워주세요!");
	}
	userRef.push({
	    email: email.value,
	    phone: phone.value,
	    mes: mes.value
	  }).then(res => {
		//  var x = name.value;
		  //person.push({:email.value});
		  console.log(person);
	      console.log(res.getKey()) // this will return you ID
	    })
	    .catch(error => console.log(error));
	
	alert("스케줄 등록 성공!");
	}
 
function backing(){
	location.href="../code/TP_2.html";
}
  
//sign out
function signOut() {
    if(!confirm("Do you really want to log out?")) {
        return;
    }

    firebase.auth().signOut().then(function() {
    		console.log("aaa");
        location.reload();
    }, function(e) {
        lastWork = "authorized";
        $("#error #errmsg").html(e.message)
        $("#error").show();
        $("#authorized").hide();
    });
}

document.getElementById("one").innerHTML = caldate(0);
document.getElementById("two").innerHTML = caldate(1);
document.getElementById("three").innerHTML = caldate(2);
document.getElementById("four").innerHTML = caldate(3);
document.getElementById("five").innerHTML = caldate(4);
document.getElementById("six").innerHTML = caldate(5);
document.getElementById("seven").innerHTML = caldate(6);

function caldate(day){

	 var caledmonth, caledday, caledYear;
	 var loadDt = new Date();
	 var v = new Date(Date.parse(loadDt) + day*1000*60*60*24);

	 caledYear = v.getFullYear();

	 if( v.getMonth() < 9 ){
	  caledmonth = '0'+(v.getMonth()+1);
	 }else{
	  caledmonth = v.getMonth()+1;
	 }

	 if( v.getDate() < 9 ){
	  caledday = '0'+v.getDate();
	 }else{
	  caledday = v.getDate();
	 }
	 
	 if( v.getDate() < 9 ){
		  caledday_2 = '0'+v.getDay();
		 }else{
		  caledday_2 = v.getDay();
		 }
	 
	 if(caledday_2 == 1){
		 caledday_2="Mon";
	 }else if(caledday_2 == 2){
		 caledday_2="Tue";
	 }else if(caledday_2 == 3){
		 caledday_2="Wed";
	 }else if(caledday_2 == 4){
		 caledday_2="Thu";
	 }else if(caledday_2 == 5){
		 caledday_2="Fri";
	 }else if(caledday_2 == 6){
		 caledday_2="Sat";
	 }else if(caledday_2 == 0){
		 caledday_2="Sun";
	 }
	 return caledmonth+'/'+caledday+'/'+caledday_2;
}

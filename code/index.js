var authdata;
$(document).ready(function() {
    $("#error").hide();
});

var dummy="";
function gokakao(){
	location.href="./kakao.html";
}



//현재 로그인 상태를 감지해서 로그인이 되었으면 화면에 띄우고 아니면 경고창 띄우는 함수 
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
    	document.getElementById("log-button").innerHTML = user.email+"님 환영합니다.";
    	document.getElementById("log-button").style.color= "rgba(255, 255, 255, 0.65)";
    }
    else{
   		alert("로그인이 필요합니다.");
    }
  });
//table의 체크박스 값을 가져와서 Database에 저장하는 함수 
function Register(){
	var table = document.getElementById("table");
	for(var i = 1; i<table.childNodes[1].childNodes.length; i++){
		for(var j=2; j<table.childNodes[1].childNodes[i].childNodes.length; j++){
			if((table.childNodes[1].childNodes[i].childNodes[j].firstChild)){
				   if((table.childNodes[1].childNodes[i].childNodes[j].firstChild).checked){
					   dummy += table.childNodes[1].childNodes[i].childNodes[1].innerHTML+"   ";
					   dummy += (table.childNodes[1].childNodes[0].childNodes[j-2].innerHTML);
					   dummy += "+";   
				   }
			}
		}
	}
	//현재 email을 감지해서 Database에 등록하는 함수 
	firebase.auth().onAuthStateChanged(function(user) {
	    authData = user;
	    //storageRef = storage.ref(user.id);
	    if (user) {
	      authdata = user;
	    }
	    console.log(dummy);
	    console.log(authdata.email);
		var userRef = database.ref('/email/');
		userRef.push({
		    email: authdata.email,
		    day: dummy
		  });
		alert("스케줄 등록 성공!");
	  });
}
	//sign up 하는 함수 
	  function signUp() {
		    var id = $("#su_id").val();
		    var pw = $("#su_pw").val();
		    var cf = $("#su_cf").val();
		    
		    if(pw != cf) {
		        alert("Password does not match the confirm password.");
		        return;
		    }
		 
		    firebase.auth().createUserWithEmailAndPassword(id, pw)
		            .then(function() {
		                alert("Signed Up!");
		                location.href="./TP_2.html";
		            })
		            .catch(function(e) {
		             	alert("bb");
		                $("#error #errmsg").html(e.message);
		                $("#error").show();
		          //      $("#signUp").hide();
		                return;
		            });
		}


	//로그인 (sing in) 하는 함수
	  function signIn() {
	      var id = $("#si_id").val();
	      var pw = $("#si_pw").val();
	      firebase.auth().signInWithEmailAndPassword(id, pw)
	              .then(function() {
	                  $("#signIn").hide();
	                  $("#authorized").show();
	                  location.href="./TP_2.html";
	              })
	              .catch(function(e) {
	                  lastWork = "signIn";
	                  $("#error #errmsg").html(e.message);
	                  $("#error").show();
	                  $("#signIn").hide();
	                  return;
	              }); 
	  }
	  
	   
	  //되돌아 가는 함수
	  function back() {
	      $("#" + lastWork).show();
	      $("#error").hide();
	  }

	  
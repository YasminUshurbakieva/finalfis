var db = Array();
$(document).ready(function () {
	db = JSON.parse(localStorage.getItem('db')); //load from local Storage
	if (db == null) {
		db = Array();
	}
	console.log(db);
});

function register() {
	let username = $("input[name='usernameReg']").val();
	for (var i = 0; i < db.length; i++) {
		if (db[i]['username'] == username) {
			alert("User already exists!");
			return;
		}
	}

	if(!validateUsername(username)){
		alert("Invalid username!");
		return;
	}

	let pass = $("input[name='passReg']").val();
	let repass = $("input[name='repassReg']").val();

	if (validatePass(pass)) {
		if (pass != repass) {
			alert("Passwords does not match!");
		}
		else {
			addUser(username, pass);
		}
	}
	location.reload();
}

function addUser(user,pass) {
	let userStruct = {
		username: user,
		password: pass,
		activated: false
	}	
	let i = db.length;
	db[i] = userStruct;
	localStorage.setItem('db',JSON.stringify(db));//save to Local Storage
}

function validateUsername(username){
	let arr = username.split('@');
	if (arr.length != 2) {
		return false;
	} 
	arr = arr[1].split('.');
	if (arr.length != 2) {
		return false;
	} 
	return true;
}

function validatePass(pass) {
	let digit = false;
	let lower = false;
	let upper = false;
	let sym = false;
	let length = pass.length;
	if (length < 8) {
		alert("Length of password must be at least or more than 8!");
		return false;
	}
	for (var i = 0; i < length; i++) {
		if (isDigid(pass[i])) {
			digit = true;
		}
		if (isLower(pass[i])) {
			lower = true;
		}
		if (isUpper(pass[i])) {
			upper = true;
		}
		if (isSymbol(pass[i])) {
			sym = true;
		}
	}
	if (!digit || !lower || !upper || !sym) {
		alert("Password must contain at least 1 digit, 1 lowercase letter, 1 uppercase letter and 1 special symbol!")
		return false;
	}
	return true;
}

function isDigid(d) {
	let digits = "1234567890";
	for (var i = 0; i < digits.length; i++) {
		if(digits[i] == d)return true; 
	}
	return false;
}

function isLower(d) {
	let alphabet = "qwertyuiopasdfghjklzxcvbnm"; 
	for (var i = 0; i < alphabet.length; i++) {
		if(alphabet[i] == d)return true; 
	}
	return false;
}

function isUpper(d) {
	let alphabet = "QWERTYUIOPASDFGHJKLZXCVBNM"; 
	for (var i = 0; i < alphabet.length; i++) {
		if(alphabet[i] == d)return true; 
	}
	return false;
}

function isSymbol(d) {
	let symbols = "`~!@#$%^&*()_+=-<>?/*-.,";
	for (var i = 0; i < symbols.length; i++) {
		if(symbols[i] == d)return true; 
	}
	return false;
}

function login() {
	let username = $("input[name='usernameLog']").val();
	let pass = $("input[name='passLog']").val();

	if (username == 'admin' && pass == 'admin') {
		console.log("admin");
		window.location.href = 'main/valid.html';
		return false;
	}
	for (var i = 0; i < db.length; i++) {
		if (db[i]['username'] == username) {
			if (db[i]['password'] == pass) {
				if (db[i]['activated'] == false) {
					alert("Administrator must activate your account");
					return;
				}
				localStorage.setItem('currentSession', username);
				$(location).attr('href','main/login.html');
			}
			else{
				alert("Incorrect Password!");
			}	
			return;
		}		
	}	
	alert("User does not exist!");
}

function logout() {
	localStorage.removeItem('currentSession');
}

function toggleActivation(username) {
	for (var i = 0; i < db.length; i++) {
		if (username == db[i]['username']) {
			db[i]['activated'] = !db[i]['activated'];
			localStorage.setItem('db',JSON.stringify(db));//save to Local Storage
			return;
		}
	}
}

function deleteUser(username) {
	for (var i = 0; i < db.length; i++) {
		if (username == db[i]['username']) {
			db = db.filter(function(value, index, arr){ 
                return value['username'] != username;
            });
			localStorage.setItem('db',JSON.stringify(db));//save to Local Storage
			return;
		}
	}
}

$(document).ready(function () {
	for (var i = 0; i < db.length; i++) {
		let usr = db[i]['username'];
		let activated = db[i]['activated'];
		let status = '';
		if (activated == true) {
			status = 'Available';
		}
		else status = 'Blocked';
		$(".iksweb").children("tbody").append('<tr><td>' + usr + '</td><td><button class="submit" name="del" email="' + usr + '">Delete</button><td><button name="toggle" class="submit"email="' + usr +'">Block/Unblock</button></td><td>' + status + '</td></tr>');
		$("button[name='del']").on('click', function () {
			deleteUser($(this).attr('email'));
			location.reload();
		});
		$("button[name='toggle']").on('click', function () {
			toggleActivation($(this).attr('email'));
			location.reload();
		});
	}
});

$(document).ready(function () {
	if (localStorage.getItem('currentSession') != null) {
		$("a[name='togglelogin']").html('Выйти');
		$("a[name='togglelogin']").css('float','right');

		$('a[name="account"]').html(localStorage.getItem('currentSession'));
		$('a[name="account"]').css('float','right');
		$("a[name='togglelogin']").on('click', function () {
			logout();
			location.href = '../index.html';
		});
	}
	
});

/*<tr>
	<td>

	</td>
	
	<td>
    	<button class="submit">Delete</button>
	</td>
	
	<td>
		<button class="submit">Block/Unblock</button>                    
	</td>
	
	<td>

	</td>
                  
</tr>*/